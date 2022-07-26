//Importing helper functions
import classNames from "classnames";
import { storageUrl } from "utils/modules";

//Importing styles
import styles from "./styles.module.css";

const Service = ({ item, edit, onEdit, onDelete }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imageBox}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url("${storageUrl}/${item.image}")` }}
        />
      </div>
      <div className={styles.info}>
        <h3 style={edit ? { textAlign: "center" } : {}}>
          {item.heading
            ? item.heading
            : item.category_name
            ? item.category_name
            : item.product_name}
        </h3>
        {!edit ? (
          <>
            <p>{item.description}</p>
            <button className={styles.btn2}>
              Learn More
              <i className="icofont-long-arrow-right"></i>
            </button>
          </>
        ) : (
          <>
            <div className={styles.center}>
              <button
                className={classNames(styles.btn, styles.full)}
                onClick={() => onEdit(item.SK)}
              >
                <i className="icofont-edit"></i>
                Edit
              </button>
              <button
                className={classNames(styles.btn, styles.ghost)}
                onClick={() => onDelete(item.SK)}
              >
                <i className="icofont-close-circled"></i>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Service;
