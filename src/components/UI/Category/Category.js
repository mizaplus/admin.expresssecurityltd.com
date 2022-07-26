//Importing core components
import Image from "next/image";

//Importing styles
import styles from "./styles.module.css";

const Category = ({ item }) => {
  return (
    <div className={styles.product}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url("${item.image}")` }}
      />
      <div className={styles.info}>
        <Image
          src={item.icon}
          alt="logo"
          height={item.icon.height - 5}
          width={item.icon.width - 5}
        />
        <div>
          <h4>{item.tagline}</h4>
          <h3>{item.heading}</h3>
        </div>
      </div>
    </div>
  );
};

export default Category;
