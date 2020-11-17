import styles from './DarkBox.module.css';

const DarkBox = ({ children }) => {
  return <section className={styles.darkbox}>{children}</section>;
};

export default DarkBox;
