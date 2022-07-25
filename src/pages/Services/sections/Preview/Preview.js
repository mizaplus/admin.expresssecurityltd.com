//Importing core components
import { Container, Grid } from "@mui/material";
import header from "assets/headers/header-services.png";
import NoData from "components/UI/NoData/NoData";
import Service from "components/UI/Service/Service";
import { Fade } from "react-reveal";

//Importing styles
import styles from "./styles.module.css";

const Preview = ({ data }) => {
  const { welcome, services } = data;
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
          <div className={styles.content}>
            <h2>{welcome.heading}</h2>
            <p>{welcome.description}</p>
            <button className={styles.btn}>
              <i className="icofont-repair"></i> Get Started
            </button>
          </div>
        </div>
        <div className={styles.services}>
          <Container maxWidth="lg">
            {services.length === 0 ? (
              <NoData />
            ) : (
              <Grid container spacing={3}>
                {services.map((item) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <Service item={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </div>
      </div>
    </Fade>
  );
};

export default Preview;
