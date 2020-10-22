import { useEffect } from 'react';
import { useUserState } from '@context/user';

const VideoPlayer = ({ publicId }) => {
  const { activity } = useUserState();
  const ref = React.useRef();

  useEffect(() => {
    const video = ref.current;

    if (!video) return;

    const handleProgress = (event) => {
      const percentage = Math.round(
        (event.target.currentTime / event.target.duration) * 100
      );
      activity.send('video-progress', {
        videoId: publicId,
        percentage,
      });
    };

    video.addEventListener('timeupdate', handleProgress);

    return () => video.removeEventListener('timeupdate', handleProgress);
  }, []);

  // TODO let's add support for smaller formats as well
  return (
    <video ref={ref} controls id="lesson-video" className="cld-video-player">
      <source
        src={`https://res.cloudinary.com/netlify/video/upload/ac_none/${publicId}.mp4`}
        type="video/mp4"
      />
    </video>
  );
};

export default VideoPlayer;
