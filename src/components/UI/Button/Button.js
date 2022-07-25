//Importing core components
import classNames from "classnames";

//Importing styles
import styles from "./styles.module.css";

const Button = ({ icon, title, hide, small }) => {
  return (
    <button
      className={
        hide
          ? classNames(styles.btn, styles.hide)
          : classNames(styles.btn, small ? styles.small : "")
      }
    >
      {title} <i className={icon}></i>
    </button>
  );
};

export default Button;
