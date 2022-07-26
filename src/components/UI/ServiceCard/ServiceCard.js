//Importing styles
import { storageUrl } from "utils/modules";
import styles from "./styles.module.css";

const ServiceCard = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imageBox}>
        <div
          style={{
            backgroundImage: `url("${storageUrl}/${item.image}")`,
          }}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3>{item.heading}</h3>
        <p>{item.description}</p>
        <button className={styles.btn}>
          Learn More <i className="icofont-long-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
