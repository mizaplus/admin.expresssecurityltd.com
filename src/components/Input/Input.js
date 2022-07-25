import styles from "./styles.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";

const Input = ({
  title,
  color,
  value,
  type,
  onTextChange,
  placeholder,
  disabled,
  icon,
  accept,
  maxLength,
  clicked,
  lg,
}) => {
  return (
    <div className={styles.Input}>
      {title && (
        <label style={{ color: color }}>
          {title} *
          {maxLength && <span>{`(${maxLength - value.length} chars)`}</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          className={classNames(styles.textarea, lg ? styles.lg : "")}
          value={value}
          autoComplete={"off"}
          onChange={(e) => onTextChange(e.target.value)}
          style={{ color: color }}
          disabled={disabled}
          maxLength={maxLength ? maxLength : 130}
        ></textarea>
      ) : (
        <div className={styles.InputWrapper}>
          {icon && (
            <div
              className={clicked ? styles.activeIcon : styles.iconBox}
              onClick={() => clicked()}
            >
              <i className={classNames(icon, styles.icon)}></i>
            </div>
          )}
          <input
            style={{ color: color }}
            disabled={disabled}
            placeholder={placeholder}
            accept={accept}
            maxLength={maxLength ? maxLength : 300}
            type={type}
            value={value}
            autoComplete={"off"}
            onChange={(e) => onTextChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onTextChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Input;
