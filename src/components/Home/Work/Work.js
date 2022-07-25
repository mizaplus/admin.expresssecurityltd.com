//Importing core components
import { Container, Grid } from "@mui/material";

//Importing styles
import styles from "./styles.module.css";

const Work = ({ data }) => {
  return (
    <div className={styles.Works}>
      <Container maxWidth="lg">
        <div className={styles.heading}>
          <h4>WHAT WE DO.</h4>
          <h2>
            We Donate to charity causes
            <br /> around the world.
          </h2>
          <div className={styles.divider} />
        </div>
        <Grid container spacing={3}>
          {data.map((work) => (
            <Grid item xs={12} sm={6} md={4} key={Math.random()}>
              <div className={styles.card}>
                <i className={work.icon}></i>
                <h3>{work.heading}</h3>
                <p>{work.description}</p>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Work;
