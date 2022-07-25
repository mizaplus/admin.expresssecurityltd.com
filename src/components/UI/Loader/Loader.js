//Importing core components
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";

//Importing styles
import styles from "./styles.module.css";

const Loader = ({ message }) => {
  return (
    <div className={styles.loader}>
      <Spinner color="#fff" size={22} speed={0.6} animating={true} />
      <p>{message ? message : "Loading Data, Please Wait"}</p>
    </div>
  );
};

export default Loader;
