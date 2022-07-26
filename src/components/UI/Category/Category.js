//Importing core components
import { storageUrl } from "utils/modules";

//Importing styles
import styles from "./styles.module.css";

const Category = ({ item }) => {
  return (
    <div className={styles.product}>
      <img
        className={styles.image}
        style={{ backgroundImage: `url("${storageUrl}/${item.image}")` }}
        alt=""
      />
      <div className={styles.info}>
        <h4>{item.tagline}</h4>
        <h3>{item.category_name}</h3>
      </div>
    </div>
  );
};

export default Category;
