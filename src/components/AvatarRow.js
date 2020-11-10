import styles from './AvatarRow.module.css';

const AvatarRow = (props) => {
  return (
    <div className={styles['avatar-row']}>
      <img src={props.src} className="avatar" />
      <p className={styles['avatar-label']}>{props.label}</p>
    </div>
  );
};

export default AvatarRow;
