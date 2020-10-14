import { useEffect } from 'react';

const VideoPlayer = ({ publicId }) => {
  const ref = React.useRef();

  useEffect(() => {
    const video = ref.current;

    if (!video) return;

    const handleProgress = (event) => {
      // TODO handle storing percentages for user progress
      console.log({
        currentTime: event.target.currentTime,
        duration: event.target.duration,
        percentage: Math.round(
          (event.target.currentTime / event.target.duration) * 100
        ),
      });
    };

    video.addEventListener('timeupdate', handleProgress);

    return () => video.removeEventListener('timeupdate', handleProgress);
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
