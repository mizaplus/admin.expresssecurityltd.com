//Importing helper functions
import { useState } from "react";

//Importing core components
import { Grid } from "@mui/material";
import { Fade } from "react-reveal";

//Importing sections
import ManageHeader from "../ManageHeader/ManageHeader";
import ManageInfo from "../ManageInfo/ManageInfo";

//Importing styles
import styles from "./styles.module.css";
import Map from "../Map/Map";
import Preview from "../Preview/Preview";
import Slots from "../Slots/Slots";

const Root = ({ data, refetchData }) => {
  const [tab, setTab] = useState(0);
  const tabs = ["Preview", "Welcome", "Info", "Slots", "Map"];

  return (
    <Fade>
      <div className={styles.Root}>
        <div className={styles.Tabs}>
          <Grid container justifyContent={"center"}>
            {tabs.map((item, i) => (
              <Grid
                key={Math.random()}
                item
                xs={2}
                className={i !== 4 ? styles.slab : ""}
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
        {tab === 2 && <ManageInfo data={data.info} refetchData={refetchData} />}
        {tab === 3 && <Slots data={data.slots} refetchData={refetchData} />}
        {tab === 4 && <Map data={data.map} refetchData={refetchData} />}
      </div>
    </Fade>
  );
};

export default Root;
