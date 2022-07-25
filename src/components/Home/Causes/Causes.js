//Importing core components
import { Container, Grid } from "@mui/material";
import Cause from "components/Cause/Cause";

//Importing styles
import styles from "./styles.module.css";

const Causes = ({data}) => {
  return (
    <div className={styles.Causes}>
      <Container maxWidth="lg">
        <h2>Latest Causes.</h2>
        <div className={styles.showcase}>
          <Grid container spacing={3} className={styles.showcase}>
            {data.map((cause) => (
              <Grid item xs={12} sm={6} md={6} key={Math.random()}>
                <Cause item={cause} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Causes;
