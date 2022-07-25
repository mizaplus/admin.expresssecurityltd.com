import classNames from "classnames";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";

const Button = ({ color, clicked, title, loading, icon }) => {
  const clickListener = (e) => {
    if (!loading) {
      e.preventDefault();
      clicked();
    }
  };

  return (
    <div
      onClick={clickListener.bind(this)}
      className={classNames(styles.Button, styles[color])}
    >
      {!loading && <p>{title}</p>}
      {loading && <Dots color="#fff" size={12} speed={1} animating={true} />}
      {icon && (
        <a href="/">
          <FontAwesomeIcon
            icon={icon}
            className={styles.icon}
            onClick={clicked}
          />
        </a>
      )}
    </div>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["success", "danger", "primary", "reset", "warning"])
    .isRequired,
  clicked: PropTypes.func.isRequired,
  icon: PropTypes.element,
  loading: PropTypes.bool,
};

export default Button;
