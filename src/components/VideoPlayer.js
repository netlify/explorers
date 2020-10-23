import { useEffect } from 'react';
import { useUserState } from '@context/user';
import debounce from 'lodash/debounce';

const VideoPlayer = ({ publicId }) => {
  const { activity } = useUserState();
  const ref = React.useRef();

  useEffect(() => {
    const video = ref.current;

    if (!video) return;

    // 2 debounced functions to make sure both fire at least once
    const sendProgressDebounced = debounce(activity.send, 500);
    const sendCompleteDebounced = debounce(activity.send, 500);

    const handleProgress = (event) => {
      const percentage = Math.round(
        (event.target.currentTime / event.target.duration) * 100
      );

      sendProgressDebounced('video-progress', {
        videoId: publicId,
        percentage,
      });
    };

    const handleCompleted = (event) => {
      // if they’ve watched more than 95% of the video, call it done
      const isComplete =
        (event.target.currentTime / event.target.duration) > 0.95;

      if (!isComplete) {
        return;
      }

      sendCompleteDebounced('video-complete', { videoId: publicId });
    };

    const handleWindowClose = () => {
      const percentage = Math.round((video.currentTime / video.duration) * 100);
      activity.send('video-progress', {
        videoId: publicId,
        percentage,
      });

      if (percentage > 95) {
        activity.send('video-complete', { videoId: publicId });
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
  }, []);

  // TODO let's add support for smaller formats as well
  return (
    <video
      ref={ref}
      controls
      id="lesson-video"
      className="cld-video-player"
      width="600"
    >
      <source
        src={`https://res.cloudinary.com/netlify/video/upload/ac_none/${publicId}.mp4`}
        type="video/mp4"
      />
    </video>
  );
};

export default VideoPlayer;
