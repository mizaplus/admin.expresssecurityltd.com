//Importing core components
import { Rating } from "react-simple-star-rating";

//Importing styles
import styles from "./styles.module.css";

const Review = ({ item, edit, onSelect, onDelete }) => {
  return (
    <div className={edit ? styles.editClient : styles.client}>
      <img src={item.image} alt="" />
      <h2>{item.client_name}</h2>
      <Rating
        readonly
        initialValue={item.rating}
        size={15}
        fillColor={"#f1a545"}
      />
      {!edit ? (
        <p>{item.client_message}</p>
      ) : (
        <div className={styles.btns}>
          <button className={styles.btn} onClick={() => onSelect(item.SK)}>
            Edit{" "}
          </button>
          <button className={styles.btnDel} onClick={() => onDelete(item.SK)}>
            Delete{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Review;
