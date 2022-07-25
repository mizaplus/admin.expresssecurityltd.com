//Importing core components
import { Container, Grid } from "@mui/material";
import header from "assets/headers/header-services.png";
import Review from "components/Review/Review";
import { Fade } from "react-reveal";

//Importing styles
import styles from "./styles.module.css";

const Preview = ({ data }) => {
  const { welcome } = data;
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
              <a href="#job-listings">Testimonials</a>
            </li>
          </ul>
        </div>
        <div className={styles.box}>
          <h4>Testimonials.</h4>
          <h3>What Clients Say.</h3>
          <Grid container spacing={3}>
            {data.testimonials.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={Math.random()}>
                <Review item={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Fade>
  );
};

export default Preview;
