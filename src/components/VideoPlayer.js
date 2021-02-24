import { useEffect } from 'react';
import { useUserState } from '@context/user';
import debounce from 'lodash/debounce';
import styles from './VideoPlayer.module.css';

const cleanText = (text) => {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
};

const VideoPlayer = ({
  emitStageComplete,
  publicId,
  poster,
  title,
  videoUrls,
  captionFilePath,
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
   * build a poster image using Cloudinary APIs
   */
  const urlBase = 'https://res.cloudinary.com/netlify/video/upload';
  const dims = 'q_auto,f_auto,w_1280,h_720,c_fill';
  const titleText = `l_text:Roboto_80_center:${cleanText(
    title
  )},co_white,w_1000,c_fit`;
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
        {videoUrls.map(({ url, type }, index) => (
          <source key={`video-${index}`} src={url} type={type} />
        ))}
        {captionFilePath && (
          <track
            label="English"
            kind="subtitles"
            srcLang="en"
            src={`/${captionFilePath}`}
            default
          />
        )}
        <p>Your browser does not support video.</p>
      </video>
    </div>
  );
};

export default VideoPlayer;
