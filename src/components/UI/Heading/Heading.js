//Importing styles
import styles from "./styles.module.css";

const Heading = ({ title }) => {
  return (
    <div className={styles.top}>
      <h3>{title}</h3>
    </div>
  );
};

export default Heading;
