import styles from './VideoCard.module.css';
import Link from 'next/link';

const VideoCard = ({ video: { coverImage, title, instructor, avatar, body, slug } }) => {
  const bkStyle = {
    background: `url(${ coverImage }) center top no-repeat`
  };

  return (
    <div className={ styles.card } style={ bkStyle }>
      <div className={ styles.cardinfo }>
        <div className={ styles.carddescription }>
          <h3>{ title }</h3>
          <div className="avatarrow">
            <p className="uppercase">{ instructor }</p>
            <img src={ avatar } className="avatar" />
          </div>
        </div>
        <div>{ body }</div>
        <div className={ styles.cardbutton }>
          <Link href="/learn/[slug]" as={`/learn/${ slug }`}>
            <a className="btn">
              Watch Course
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
