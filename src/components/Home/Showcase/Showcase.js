//Importing core components
import { Container, Grid } from "@mui/material";

//Importing styles
import styles from "./styles.module.css";

const Showcase = ({ data }) => {
  return (
    <div className={styles.Showcase}>
      <Container maxWidth="md">
        <Grid container>
          {data.slots.map((slot, index) => (
            <Grid item xs={12} sm={12} md={4} key={Math.random()}>
              <div className={styles[`grid${index + 1}`]}>
                <i className={slot.icon}></i>
                <h2>{slot.heading}</h2>
                <p>{slot.description}</p>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className={styles.About}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} className={styles.imageBox}>
            <img
              src={data.info.image.url}
              alt=""
              className={styles.image1}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={styles.info}>
              <h2>{data.info.heading}</h2>
              <p>{data.info.description}</p>
              <ul>
                {data.info.taglines.map((tagline) => (
                  <li key={Math.random()}>
                    <i className="icofont-check-circled"></i>
                    {tagline}
                  </li>
                ))}
              </ul>
              <button className={styles.btn}>Discover More</button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Showcase;
