//Importing helper functions
import { useState } from "react";

//Importing core components
import { Grid } from "@mui/material";
import { Fade } from "react-reveal";

//Importing sections

//Importing styles
import styles from "./styles.module.css";
import Preview from "../Preview/Preview";
import ManageHeader from "../ManagerHeader/ManagerHeader";
import Manage from "../Manage/Manage";

const Root = ({ data, refetchData }) => {
  const [tab, setTab] = useState(0);

  const tabs = ["Preview", "Welcome", "Testimonials"];

  return (
    <Fade>
      <div className={styles.Root}>
        <div className={styles.Tabs}>
          <Grid container>
            {tabs.map((item, i) => (
              <Grid
                key={Math.random()}
                item
                xs={4}
                className={i === 1 ? styles.slab : ""}
              >
                <h3
                  className={i === tab ? styles.active : ""}
                  onClick={() => setTab(i)}
                >
                  {item}
                </h3>
              </Grid>
            ))}
          </Grid>
        </div>
        {tab === 0 && <Preview data={data} />}
        {tab === 1 && (
          <ManageHeader data={data.welcome} refetchData={refetchData} />
        )}
        {tab === 2 && (
          <Manage data={data} refetchData={refetchData} />
        )}
      </div>
    </Fade>
  );
};

export default Root;
