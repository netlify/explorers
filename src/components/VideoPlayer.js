import { useEffect } from 'react';
import { useUserState } from '@context/user';
import debounce from 'lodash/debounce';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({ publicId, poster, title }) => {
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
  }, [activity, publicId]);

  // https://res.cloudinary.com/netlify/video/upload
  // sizing: /w_1280,h_720,c_fill
  // video: /l_video:explorers:Next-6-Dynamic-Routes,w_1280,h_720,c_fill/l_video:explorers:transition,e_transition/fl_layer_apply/fl_layer_apply
  // title card: /l_video:explorers:explorers-intro,fl_splice,w_1280,h_720,c_fill/eo_3,ac_none,e_accelerate:-50/l_text:Roboto_80:Dynamic%20Routes%20in%20Next.js,co_white/fl_layer_apply/so_0,fl_layer_apply
  // bumper: /explorers/bumper.mp4
  const urlBase = 'https://res.cloudinary.com/netlify/video/upload';
  const dims = 'w_1280,h_720,c_fill';
  const transition = 'l_video:explorers:transition,e_transition/fl_layer_apply';
  const videoId = publicId.replace('/', ':');
  const video = `l_video:${videoId},${dims}/${transition}/fl_layer_apply`;
  const titleText = `l_text:Roboto_80_center:${title},co_white,w_1000,c_fit`;
  const titleCard = `l_video:explorers:explorers-intro,fl_splice,${dims}/eo_3,ac_none,e_accelerate:-50/${titleText}/fl_layer_apply/so_0,fl_layer_apply`;

  const url = `${urlBase}/${dims}/${video}/${titleCard}/explorers/bumper`;

  // TODO let's add support for smaller formats as well
  return (
    <video
      controls
      key={publicId}
      id="lesson-video"
      ref={ref}
      className={styles.video}
      poster={poster}
    >
      <source src={`${url}.webm`} type="video/webm" />
      <source src={`${url}.mp4`} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;

/* 
  https://res.cloudinary.com/netlify/video/upload/w_1280,h_720,c_fill/l_video:explorers:lbiaq31v9d3uv9ndxfqb,w_1280,h_720,c_fill/l_video:explorers:test-transition,e_transition/fl_layer_apply/fl_layer_apply/explorers/temp-intro.mp4

  https://res.cloudinary.com/netlify/video/upload/w_1280,h_720,c_fill/l_video:explorers:lbiaq31v9d3uv9ndxfqb,w_1280,h_720,c_fill,du_4/l_video:explorers:test-transition,e_transition/fl_layer_apply/fl_layer_apply/l_explorers:temp-title-card,du_2,so_2,w_1280,h_720,c_fill/l_video:explorers:test-transition,e_transition,du_2/fl_layer_apply/fl_layer_apply/explorers/temp-intro.mp4
  https://res.cloudinary.com/netlify/video/upload/w_320,h_180,c_fill,du_3/l_video:explorers:a8tyb3b0xkrcs32xdqn4,w_320,h_180/so_3,du_5/l_video:explorers:test-transition,e_transition/fl_layer_apply/fl_layer_apply/l_video:explorers:lbiaq31v9d3uv9ndxfqb,w_320,h_180/l_video:explorers:test-transition,e_transition/fl_layer_apply/fl_layer_apply/explorers/temp-intro.mp4
 */
