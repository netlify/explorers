import styles from './AvatarRow.module.css';

const AvatarRow = ({ instructors }) => {
  // const instructorAvatarURL =
  //   mission.instructors[0].avatar.asset.url +
  //   '';
  console.log(instructors);

  return (
    <div className={styles['avatar-row']}>
      {instructors.map((instructor) => {
        return (
          <img
            alt={instructor.name + ' Profile Picture'}
            src={
              instructor.avatar.asset.url +
              '?fit=crop&crop=entropy&fm=jpg&w=60&h=60'
            }
            className={'avatar ' + styles.avatar}
            width="30"
            height="30"
          />
        );
      })}
      <p className={styles['avatar-label']}>
        {instructors.map((instructor) => instructor.name).join(' & ')}
      </p>
    </div>
  );
};

export default AvatarRow;
