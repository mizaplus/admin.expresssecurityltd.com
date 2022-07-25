//Importing helper functions
import classNames from "classnames";

//Importing styles
import styles from "./styles.module.css";

const Job = ({ item, edit, onEdit, onDelete }) => {
  return (
    <div className={styles.Job}>
      {!edit ? (
        <div className={styles.itemHeader}>
          <h4>{item.heading}</h4>
          <p>{item.date}</p>
        </div>
      ) : (
        <h3 className={styles.heading}>{item.heading}</h3>
      )}
      <p className={styles.description}>
        {item.description}{" "}
        {!edit && (
          <a href="/job/details" onClick={(e) => e.preventDefault()}>
            Read More.
          </a>
        )}
      </p>
      {edit && (
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
  );
};

export default Job;
