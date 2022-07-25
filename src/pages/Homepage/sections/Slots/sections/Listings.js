//Importing core components
import { Fade } from "react-reveal";
import { Grid } from "@mui/material";

//Importing styles
import styles from "../styles.module.css";

const Listings = ({ data, setItem }) => {
  return (
    <div className={styles.box}>
      <Grid container spacing={4}>
        {data.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={Math.random()}>
            <Fade bottom>
              <div className={styles.grid}>
                <i className={item.icon}></i>
                <h4>{item.heading}</h4>
                <p>{item.description}</p>
                <button
                  className={styles.edit}
                  onClick={() => {
                    document.getElementById("form").scrollIntoView();
                    setItem(item);
                  }}
                >
                  Edit Slot
                </button>
              </div>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Listings;
