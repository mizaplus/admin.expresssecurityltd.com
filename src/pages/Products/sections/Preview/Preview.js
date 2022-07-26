//Importing core components
import { Fade } from "react-reveal";
import { storageUrl } from "utils/modules";
import { Container, Grid } from "@mui/material";
import header from "assets/headers/header.png";
import NoData from "components/UI/NoData/NoData";

//Importing styles
import styles from "../../../Solutions/sections/Preview/styles.module.css";

const Preview = ({ data }) => {
  const { welcome, products } = data;
  return (
    <Fade bottom>
      <div className={styles.Preview}>
        <img src={header} alt="" className={styles.header} />
        <div
          className={styles.welcome}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url("${storageUrl}/${welcome.image}")`,
          }}
        >
          <div className={styles.content}>
            <h2>{welcome.heading}</h2>
            <p>{welcome.description}</p>
            <button className={styles.btn}>
              Explore<i className="icofont-rounded-right"></i>
            </button>
          </div>
        </div>
        <div className={styles.services}>
          <Container maxWidth="lg">
            {products.length === 0 ? (
              <NoData />
            ) : (
              <Grid container spacing={3}>
                {products.map((item) => (
                  <Grid item xs={12} sm={6} md={4}>
                    {/* <Category item={item} /> */}
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
