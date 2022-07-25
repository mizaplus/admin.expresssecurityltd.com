//Importinh helper functions
import React from "react";
import classNames from "classnames";
import CountUp from "react-countup";

//Importing core components
import { Grid } from "@mui/material";

//Importing styles
import styles from "./styles.module.css";

const DataCard = ({ title, units, measure, icon,date, index, tagline, tagicon }) => {
  return (
    <div>
      <div className={styles.card}>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <div className={classNames(styles.iconBox, styles[`bg-${index}`])}>
              <i className={icon}></i>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className={styles.info}>
              <p>{title}</p>
              <h4>
                <CountUp end={measure} start={0} duration={3} style={{fontSize: "2rem",fontWeight: "300"}}/>
                <span>{units}</span>
              </h4>
            </div>
          </Grid>
        </Grid>
        <div className={styles.footer}>
          <i className={tagicon}></i>
          <p>{tagline}: {date}</p>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
