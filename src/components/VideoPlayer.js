import styles from './VideoPlayer.module.css';
import { Video } from 'cloudinary-react';

const VideoPlayer = () => {
  return <Video cloudName="demo" controls publicId="dog" />;
};

export default VideoPlayer;
