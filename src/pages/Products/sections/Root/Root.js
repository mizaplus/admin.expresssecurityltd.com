//Importing helper functions
import { useState } from "react";

//Importing core components
import { Grid } from "@mui/material";
import { Fade } from "react-reveal";

//Importing sections
import Preview from "../Preview/Preview";
import ManageHeader from "pages/Solutions/sections/ManageHeader/ManageHeader";

//Importing styles
import styles from "../../../Solutions/sections/Root/styles.module.css";

const Root = ({ data, refetchData }) => {
  const [tab, setTab] = useState(0);

  const tabs = ["Preview", "Welcome", "Categories"];

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
        {tab === 0 && (
          <Preview data={data} refetchData={refetchData} />
        )}
        {tab === 1 && (
          <ManageHeader data={data.welcome} refetchData={refetchData} />
        )}
      </div>
    </Fade>
  );
};

export default Root;
