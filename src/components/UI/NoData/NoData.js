//Importing helper functions
import classNames from "classnames";

//Importing styles
import styles from "./styles.module.css";

const NoData = ({ dark }) => {
  return (
    <div className={classNames(styles.Nodata, dark ? styles.dark : "")}>
      <i className="icofont-error"></i>
      <p>No Records Found In Database.</p>
    </div>
  );
};

export default NoData;
