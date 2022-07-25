//Importing helper functions
import classNames from "classnames";

//Importing core components
import { Container, Grid } from "@mui/material";
import header from "assets/headers/header.png";
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
            <button className={styles.btnGhost}>
              <i className="icofont-ui-calendar"></i> Appointment
            </button>
          </div>
        </div>
        <div className={styles.About}>
          <div className={styles.top}></div>
          <Container maxWidth="lg">
            <div className={styles.box}>
              <h3>{data.info.main.subHeading}</h3>
              <h2
                dangerouslySetInnerHTML={{ __html: data.info.main.heading }}
              />
              <Grid container spacing={4}>
                {data.info.slots.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} key={Math.random()}>
                    <Fade bottom>
                      <div className={i === 1 ? styles.grid2 : styles.grid}>
                        <i className={item.icon}></i>
                        <h4>{item.heading}</h4>
                        <p>{item.description}</p>
                      </div>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
              <div className={styles.box2}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={5}>
                    <div
                      className={styles.image}
                      style={{ backgroundImage: `url("${data.about.image}")` }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <div className={styles.info}>
                      <h5>{data.about.subHeading}</h5>
                      <h4
                        dangerouslySetInnerHTML={{ __html: data.about.heading }}
                      />
                      <p>{data.about.description}</p>
                      <ul>
                        {data.about.highlights.map((item) => (
                          <li key={Math.random()}>
                            <i className="icofont-check-circled"></i> {item}
                          </li>
                        ))}
                      </ul>
                      <button className={styles.btnFull}>
                        More Info <i className="icofont-long-arrow-right"></i>
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Container>
        </div>
        <div className={styles.services}>
          <Container maxWidth="lg">
            <div className={styles.box2}>
              <h2>Our Services.</h2>
              <div className={styles.decorator}>
                <div />
                <i
                  className={classNames(styles.icon, "icofont-racings-wheel")}
                ></i>
                <div />
              </div>
              <p className={styles.description}>
                We offer a wide range of service that will help to keep your car
                going with top notch equipment available.
              </p>
            </div>
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
