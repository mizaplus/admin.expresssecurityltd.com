//Importing styles
import styles from "./styles.module.css";

const Legal = ({item}) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Area}>
        <div className={styles.top}>
          <h3>{item.heading}</h3>
        </div>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default Legal;
