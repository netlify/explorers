import { useEffect } from 'react';
import { useUserState } from '@context/user';
import debounce from 'lodash/debounce';

const VideoPlayer = ({ publicId }) => {
  const { activity } = useUserState();
  const ref = React.useRef();

  useEffect(() => {
    const video = ref.current;

    if (!video || !activity?.send) return;

    // 2 debounced functions to make sure both fire at least once
    const sendProgressDebounced = debounce(activity.send, 500);
    const sendCompleteDebounced = debounce(activity.send, 500);

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
  }, [activity]);

  // TODO let's add support for smaller formats as well
  return (
    <video controls id="lesson-video" ref={ref}>
      <source
        src={`https://res.cloudinary.com/netlify/video/upload/ac_none/${publicId}.mp4`}
        type="video/mp4"
      />
    </video>
  );
};

export default VideoPlayer;
