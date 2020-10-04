import styles from './VideoCard.module.css';
import Link from 'next/link';

function VideoCard({ video }) {
  console.log(video.title)

  const bkStyle = {
    background: `url(${video.coverImage}) center center no-repeat`
  };

  return (
    <div className={styles.card} style={ bkStyle }>
      <div className={styles.cardinfo}>
        <div>{ video.body }</div>
        <Link href="/learn/[slug]" as={`/learn/${video.slug}`}>
          <a>
            Watch Course
          </a>
        </Link>
      </div>
    </div>
  );
}

export default VideoCard;
