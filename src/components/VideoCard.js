import styles from './VideoCard.module.css';
import Link from 'next/link';

function VideoCard({ title, description }) {
  return (
    <div key={video.id} className={styles.card} style={`background: url(${video.coverImage}) center center no-repeat`}>
      <div className={styles.cardinfo}>
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
