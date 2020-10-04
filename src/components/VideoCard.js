import styles from './VideoCard.module.css';
import Link from 'next/link';

function VideoCard({ video }) {
  const bkStyle = {
    background: `url(${ video.coverImage }) center top no-repeat`
  };

  return (
    <div className={ styles.card } style={ bkStyle }>
      <div className={ styles.cardinfo }>
        <div className={ styles.carddescription }>
          <h3>{ video.title }</h3>
          <Link href="/learn/[slug]" as={`/learn/${ video.slug }`}>
            <a className="btn">
              Watch Course
            </a>
          </Link>
        </div>
        <div>{ video.body }</div>
      </div>
    </div>
  );
}

export default VideoCard;
