//Importing styles
import styles from "./styles.module.css";

const Wrapper = ({ children }) => {
  return <div className={styles.Wrapper}>{children}</div>;
};

export default Wrapper;
