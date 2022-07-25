import React from "react";

//Importing helper functions
import styles from "./style.module.css";

const Backdrop = ({ open, onClick }) => {
  
  return (
    <div
      className={open ? styles.backdrop : ""}
      onClick={() => onClick()}
    ></div>
  );
};

export default Backdrop;
