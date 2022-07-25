//Importing helper functions
import classNames from "classnames";

//Importing styles
import styles from "./styles.module.css";

const Service = ({ item, edit, onEdit, onDelete }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imageBox}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url("${item.image}")` }}
        />
      </div>
      <div className={styles.info}>
        <h3 style={edit ? { textAlign: "center" } : {}}>{item.heading}</h3>
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
            <p className={styles.infoText}>
              <i className="icofont-clock-time"></i>Time Added: {item.time}
              <br />
              <i className="icofont-calendar"></i> Date Added: {item.date}
              <br />
              <i className="icofont-refresh"></i> Last Update:{" "}
              {item.last_update ? item.last_update : "N/A"}
            </p>
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
