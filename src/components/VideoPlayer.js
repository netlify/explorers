import { useEffect } from 'react';
import { useUserState } from '@context/user';
import debounce from 'lodash/debounce';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({ emitStageComplete, publicId, poster, title }) => {
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

    const handleProgress = (event) => {
      const percentage = Math.round(
        (event.target.currentTime / event.target.duration) * 100
      );

      sendProgressDebounced('video-progress', { ...activityData, percentage });
    };

    const handleCompleted = (event) => {
      // if they’ve watched more than 95% of the video, call it done
      const percentage = event.target.currentTime / event.target.duration;
      const isComplete = percentage > 0.95;

      if (!isComplete) {
        return;
      }

      emitStageCompleteDebounced();
      sendCompleteDebounced('video-complete', activityData);
    };

    const handleWindowClose = () => {
      const percentage = Math.round((video.currentTime / video.duration) * 100);
      activity.send('video-progress', { ...activityData, percentage });

      if (percentage > 95) {
        activity.send('video-complete', activityData);
      }
    };

    window.addEventListener('beforeunload', handleWindowClose);
    video.addEventListener('timeupdate', handleProgress);
    video.addEventListener('pause', handleCompleted);
    video.addEventListener('ended', handleCompleted);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      video.removeEventListener('timeupdate', handleProgress);
      video.removeEventListener('pause', handleCompleted);
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
   * 4. create a title card and splice it at the beginning of the video
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
   * 5. all of this is done on the bumper file
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
  const dims = 'w_1280,h_720,c_fill';
  const transition = 'l_video:explorers:transition,e_transition/fl_layer_apply';
  const videoId = publicId.replace('/', ':');
  const video = `l_video:${videoId},${dims}/${transition}/fl_layer_apply`;
  const titleText = `l_text:Roboto_80_center:${title},co_white,w_1000,c_fit`;
  const titleCard = `l_video:explorers:explorers-intro,fl_splice,${dims}/eo_3,ac_none,e_accelerate:-25/${titleText}/fl_layer_apply/so_0,fl_layer_apply`;

  // leave off the format so we can use both webm and mp4 below
  const url = `${urlBase}/${dims}/${video}/${titleCard}/explorers/bumper`;

  // use some of the same techniques to create a poster image with the title
  const videoPoster =
    poster ??
    `${urlBase}/${dims},q_auto,f_auto,so_0/${titleText}/explorers/explorers-intro.jpg`;

  return (
    <video
      controls
      key={publicId}
      id="lesson-video"
      ref={ref}
      className={styles.video}
      poster={videoPoster}
    >
      <source src={`${url}.webm`} type="video/webm" />
      <source src={`${url}.mp4`} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
