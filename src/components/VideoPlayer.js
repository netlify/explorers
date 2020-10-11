import { useEffect } from 'react';
import cloudinaryCore from 'cloudinary-core';
import 'cloudinary-video-player';
import 'cloudinary-video-player/dist/cld-video-player.min.css';

const playedEventPercents = Array.apply(null, { length: 100 }).map(
  (_, i) => i + 1
);

const VideoPlayer = ({ source }) => {
  useEffect(() => {
    // account config:
    // https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters
    const cloudinary = cloudinaryCore.Cloudinary.new({ cloud_name: 'demo' });
    const player = cloudinary.videoPlayer('lesson-video', {
      playedEventPercents,
    });
    player.source('dog'); // TODO: change to actual source lol

    // events api:
    // https://cloudinary.com/documentation/video_player_api_reference#events
    player.on('percentsplayed', (event) => {
      console.log('percentsplayed', event.eventData.percent);
      // update user progress
    });
  }, []);

  // player config options:
  // https://cloudinary.com/documentation/video_player_api_reference#player_visuals
  return (
    <video
      controls
      id="lesson-video"
      className="cld-video-player"
      width="600"
    ></video>
  );
};

export default VideoPlayer;
