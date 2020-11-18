import { useEffect } from 'react';
import { useUserState } from '@context/user';
import debounce from 'lodash/debounce';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({
  emitStageComplete,
  publicId,
  poster,
  title,
  isFinalStage,
}) => {
  const { activity } = useUserState();
  const ref = React.useRef();

  useEffect(() => {
    const video = ref.current;

    if (!video || !activity?.send) return;

    // 2 debounced functions to make sure both fire at least once
    const sendProgressDebounced = debounce(activity.send, 500);
    const sendCompleteDebounced = debounce(activity.send, 500);
    const emitStageCompleteDebounced = debounce(emitStageComplete, 250);

    const activityData = {
      videoId: publicId,
      path: window.location.pathname,
    };

    /*
     * @lindsaylevine made a good point that we have different behaviors for
     * different completion levels and different actions. to address that, this
     * gives us three different measures of complete:
     *
     * 1. `isCompleteIsh` — if someone pauses or closes the tab after watching
     *    all but the last 5 seconds of a video, we should consider the video
     *    completed since the last 5 seconds is the bumper
     * 2. `isComplete` — for displaying confetti and auto-forwarding to the next
     *    video, we want the video to be all the way complete
     * 3. `percentage` — for tracking, we need to know how much of the video has
     *    been watched
     */
    function getCompletionData(vid) {
      return {
        isCompleteIsh: vid.currentTime >= vid.duration - 5,
        isComplete: vid.currentTime === vid.duration,
        percentage: Math.round((vid.currentTime / vid.duration) * 100),
      };
    }

    const handleProgress = (event) => {
      const { percentage } = getCompletionData(event.target);

      sendProgressDebounced('video-progress', { ...activityData, percentage });
    };

    const handleCompleted = (event) => {
      // if they've watched all of the video except the last 2 seconds, it’s done
      const { isComplete } = getCompletionData(event.target);

      if (!isComplete) {
        return;
      }

      emitStageCompleteDebounced();
      sendCompleteDebounced('video-complete', activityData);
    };

    const handlePause = (event) => {
      const { isCompleteIsh } = getCompletionData(event.target);

      if (isCompleteIsh) {
        sendCompleteDebounced('video-complete', activityData);
      }
    };

    const handleWindowClose = () => {
      const { percentage, isCompleteIsh } = getCompletionData(video);
      activity.send('video-progress', { ...activityData, percentage });

      if (isCompleteIsh) {
        activity.send('video-complete', activityData);
      }
    };

    window.addEventListener('beforeunload', handleWindowClose);
    video.addEventListener('timeupdate', handleProgress);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleCompleted);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      video.removeEventListener('timeupdate', handleProgress);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleCompleted);
    };
  }, [activity, publicId]);

  /*
   * okay, let’s go on a little tour of how Cloudinary’s video editing works.
   * this will break down the anatomy of the URL and walk through each layer
   * and how it’s used:
   *
   * 1. we need the base URL
   *    https://res.cloudinary.com/netlify/video/upload
   *
   * 2. we need to set the sizing for the video we’re about to generate
   *    /w_1280,h_720,c_fill
   *
   * 3. the actual video goes here — NOT at the end — because transitions in
   *    Cloudinary are weird
   *
   *    we add this video (at the same size and crop settings) as a layer (`l_`)
   *    and finish with a transition, which is *another* video — a luma matte —
   *    that lets us do a cool switchover from the bumper to the actual video
   *
   *    the `fl_layer_apply` part tells Cloudinary that we’re done with settings
   *    for the current layer. note the double since there are two videos here
   *
   *    /l_video:explorers:Next-6-Dynamic-Routes,w_1280,h_720,c_fill/l_video:explorers:transition,e_transition/fl_layer_apply/fl_layer_apply
   *
   * 4. the outro bumper has some logic!
   *
   *    if this is the last video in a mission, we show the "complete" video to
   *    give the viewer a thumbs up (this would have been a high five, but in
   *    space that kind of altitude can cause vertigo). if there’s another video
   *    after this one, we show a countdown and auto-advance after it completes
   *
   *    /l_video:explorers:countdown,w_1280,h_720,c_fill/l_video:explorers:transition,e_transition/fl_layer_apply/fl_layer_apply
   *
   * 5. create a title card and splice it at the beginning of the video
   *
   *    for this, we’re taking the first 3 seconds (`eo_3`) of the intro video,
   *    splicing it (`fl_splice`) at the beginning of the generated video,
   *    resizing and cropping it, removing the audio ()`ac_none`), and slowing
   *    it down by 25% (`e_accelerate:-25`)
   *
   *    we then add a text overlay (`l_text`) and set the title in white
   *    (`co_white`)
   *
   *    by adding the `so_0` before applying the title card layer, we tell the
   *    splice to happen at the beginning instead of the end
   *
   *    /l_video:explorers:explorers-intro,fl_splice,w_1280,h_720,c_fill/eo_3,ac_none,e_accelerate:-25/l_text:Roboto_80:Dynamic%20Routes%20in%20Next.js,co_white/fl_layer_apply/so_0,fl_layer_apply
   *
   * 6. all of this is done on the bumper file
   *
   *    this is a little confusing, because effectively *every* video on the
   *    site is technically the bumper, but due to the way transitions work, we
   *    have to make this the base and build the other layers on top of it
   *
   *    /explorers/bumper.mp4
   *
   * easy peasy light and breezy lemon squeezy, right 🙃
   */
  const urlBase = 'https://res.cloudinary.com/netlify/video/upload';
  const dims = 'q_auto,w_1280,h_720,c_fill';
  const transition = 'l_video:explorers:transition,e_transition/fl_layer_apply';
  const videoId = publicId.replace('/', ':');
  const video = `l_video:${videoId},${dims}/${transition}/fl_layer_apply`;
  const outroVideoId = isFinalStage ? 'complete' : 'countdown';
  const outro = `l_video:explorers:${outroVideoId},${dims}/${transition}/fl_layer_apply`;
  const titleText = `l_text:Roboto_80_center:${title},co_white,w_1000,c_fit`;
  const titleCard = `l_video:explorers:intro,fl_splice,${dims}/eo_3,ac_none,e_accelerate:-25/${titleText}/fl_layer_apply/so_0,fl_layer_apply`;

  // leave off the format so we can use both webm and mp4 below
  const url = `${urlBase}/${dims}/${video}/${outro}/${titleCard}/explorers/bumper`;

  // use some of the same techniques to create a poster image with the title
  const videoPoster =
    poster ?? `${urlBase}/${dims},f_auto,so_2/${titleText}/explorers/intro.jpg`;

  return (
    <div className={styles.aspectRatioContainer}>
      <video
        controls
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        key={publicId}
        id="lesson-video"
        ref={ref}
        className={styles.video}
        poster={videoPoster}
      >
        <source src={`${url}.webm`} type="video/webm" />
        <source src={`${url}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
