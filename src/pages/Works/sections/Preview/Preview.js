//Importing helper functions
import classNames from "classnames";

//Importing core components
import { Fade } from "react-reveal";
import header from "assets/headers/header-careers.png";

//Importing styles
import styles from "./styles.module.css";
import { Grid } from "@mui/material";

const Preview = ({ data }) => {
  const { welcome, works } = data;
  return (
    <Fade bottom>
      <div className={styles.Preview}>
        <img src={header} alt="" className={styles.header} />
        <div
          className={styles.welcome}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url("${welcome.image}")`,
          }}
        >
          <h2>{welcome.heading}</h2>
          <ul>
            <li style={{ textDecoration: "underline" }}>
              <a href="/">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="#job-listings">Works</a>
            </li>
          </ul>
        </div>
        <div className={styles.box}>
          <h2>{welcome.subHeading}</h2>
          <div className={styles.decorator}>
            <div />
            <i className={classNames(styles.icon, "icofont-repair")}></i>
            <div />
          </div>
          <Grid container spacing={3}>
            {works.slice(0, 3).map((item) => (
              <Grid item xs={12} sm={6} md={4}>
                <div
                  className={styles.img}
                  style={{ backgroundImage: `url("${item.after_image}")` }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Fade>
  );
};

export default Preview;
