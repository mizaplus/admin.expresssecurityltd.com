//Importing helper functions
import * as utils from "react";
import { Fade } from "react-reveal";

//Importing core components
import Heading from "components/UI/Heading/Heading";
import Jobs from "./sections/Jobs";

//Importing styles
import styles from "pages/Services/sections/ManageServices/styles.module.css";
import Manage from "./sections/Manage";

const ManageServices = ({ data, refetchData }) => {
  const [item, setItem] = utils.useState(null);

  return (
    <>
      <Fade bottom>
        <div className={styles.ManageServices}>
          <Heading title={`Jobs Available In Database.(${data.length})`} />
          <Jobs
            data={data}
            setId={(value) => {
              const obj = data.filter((item) => item.SK === value)[0];
              setItem(obj ? obj : null);
            }}
            refetchData={refetchData}
          />
          <Heading title={item ? "Edit Job Details." : "Publish New Job."} />
          <Manage
            id={item ? item.SK : null}
            data={item}
            setItem={(value) => setItem(value)}
            refetchData={refetchData}
          />
        </div>
      </Fade>
    </>
  );
};

export default ManageServices;
