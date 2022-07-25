//Importing helper functions
import classNames from "classnames";

//Importing core components
import { Container, Grid } from "@mui/material";
import { Fade } from "react-reveal";
import header from "assets/headers/header-careers.png";
import NoData from "components/UI/NoData/NoData";
import Job from "components/UI/Job/Job";

//Importing styles
import styles from "./styles.module.css";

const Preview = ({ data }) => {
  const { welcome, jobs } = data;
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
              <a href="#job-listings">Opportunities</a>
            </li>
          </ul>
        </div>
        <div className={styles.careers} id="#job-listings">
          <div className={styles.box}>
            <h2>Available Opportunities.</h2>
            <div className={styles.decorator}>
              <div />
              <i className={classNames(styles.icon, "icofont-briefcase")}></i>
              <div />
            </div>
          </div> 
          {jobs.length > 0 ? (
            <Container maxWidth="lg">
              <Grid container spacing={3} justifyContent="center">
                {jobs.map((job) => (
                  <Grid item xs={12} sm={12} md={9}>
                    <Job item={job} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </Fade>
  );
};

export default Preview;
