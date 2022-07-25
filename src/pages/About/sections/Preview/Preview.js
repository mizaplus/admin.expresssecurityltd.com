//Importing core components
import { Container, Grid } from "@mui/material";
import { Fade } from "react-reveal";
import header from "assets/headers/header-careers.png";

//Importing styles
import styles from "./styles.module.css";

const Preview = ({ data }) => {
  const { welcome, info, slots } = data;
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
              <a href="#job-listings">About Us</a>
            </li>
          </ul>
        </div>
        <div className={styles.info}>
          <Container maxWidth="lg">
            <h2 className={styles.title}>{info.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: info.information }} />
          </Container>
        </div>
        <Grid container spacing={3}>
          {slots.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={Math.random()}>
              <div className={styles.slot}>
                <i className={item.icon}></i>
                <h3>{item.heading}</h3>
                <p>{item.description}</p>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Fade>
  );
};

export default Preview;
