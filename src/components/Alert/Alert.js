import classNames from "classnames";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

const Alert = ({ color, open, clicked, message, loading, progress }) => {
  const closeHandler = (e) => {
    e.preventDefault();
    clicked();
  };

  return (
    <div
      className={
        open
          ? classNames(styles.alert, styles[color], styles.open)
          : classNames(styles.alert, styles[color], styles.closed)
      }
    >
      <div className={styles.titleBox}>
        <h3>{color}</h3>
        <a href="/" onClick={closeHandler.bind(this)}>
          {loading ? (
            <Spinner color="#fff" size={12} speed={1} animating={true} />
          ) : (
            <FontAwesomeIcon
              icon={faTimes}
              className={styles.icon}
              onClick={clicked}
            />
          )}
        </a>
      </div>
      <div className={styles.controlBox}>
        <p>{message}{progress && `(${progress}%)`}</p>
        {(progress && loading) && (
          <div
            style={{ width: `${progress}%` }}
            className={styles.progress}
          ></div>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["success", "error", "info"]).isRequired,
  open: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Alert;
