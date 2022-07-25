//Importing styles
import styles from "./styles.module.css";

const Welcome = ({data}) => {
  return (
    <div
      className={styles.slide}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url("${data.image.url}")`,
      }}
    >
      <div className={styles.content}>
        <div>
          {" "}
          <h2>{data.heading}</h2>
          <p>
            {data.description}
          </p>
        </div>
        <button className={styles.btn}>Discover More</button>
      </div>
    </div>
  );
};

export default Welcome;
