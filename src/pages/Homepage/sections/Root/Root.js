//Importing helper functions
import { useState } from "react";

//Importing core components
import { Grid } from "@mui/material";
import { Fade } from "react-reveal";

//Importing sections
import Preview from "../Preview/Preview";
import ManageHeader from "../ManageHeader/ManageHeader";
import About from "../About/About";
import Slots from "../Slots/Slots";

//Importing styles
import styles from "./styles.module.css";

const Root = ({ data, refetchData }) => {
  const [tab, setTab] = useState(0);

  const tabs = ["Preview", "Welcome", "About", "Slots"];

  return (
    <Fade>
      <div className={styles.Root}>
        <div className={styles.Tabs}>
          <Grid container>
            {tabs.map((item, i) => (
              <Grid
                key={Math.random()}
                item
                xs={3}
                className={i !== 3 ? styles.slab : ""}
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
          <ManageHeader refetchData={refetchData} data={data.welcome} />
        )}
        {tab === 2 && <About refetchData={refetchData} data={data.about} />}
        {tab === 3 && (
          <Slots refetchData={refetchData} data={data.info.slots} />
        )}
      </div>
    </Fade>
  );
};

export default Root;
