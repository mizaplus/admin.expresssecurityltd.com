import React from "react";

import styles from "./styles.module.css";

const Error = ({ title, refetchData }) => {
  return (
    <div className={styles.Error}>
      <i className="icofont-close-line"></i>
      <p>{title}</p>
      <button className={styles.btn} onClick={refetchData}>
        <i className="icofont-refresh"></i> Reload Data
      </button>
    </div>
  );
};

export default Error;
