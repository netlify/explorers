import styles from './DarkBox.module.css';

const DarkBox = ({ children, className }) => {
  const classNamesCombined = className
    ? `${styles.darkbox} ${className}`
    : `${styles.darkbox}`;

  return <section className={classNamesCombined}>{children}</section>;
};

export default DarkBox;
