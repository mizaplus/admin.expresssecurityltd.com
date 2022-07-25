//Importing styles
import styles from "./styles.module.css";

//Importing core components

const BlogCard = ({ item }) => {
  return (
    <div className={styles.BlogCard}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url("${item.image}")` }}
      />
      <div className={styles.dateBox}>
        <p>25th</p>
        <h4>Dec</h4>
      </div>
      <div className={styles.info}>
        <h2>How Does Malnutrition Affect Children?</h2>
      </div>
      <div className={styles.controlBox}>
        <a href="#">
          <div className={styles.icon}>
            <i className="icofont-user-alt-5"></i>
          </div>
          <p>Admin</p>
        </a>
        <button className={styles.btn}>Read More</button>
      </div>
    </div>
  );
};

export default BlogCard;
