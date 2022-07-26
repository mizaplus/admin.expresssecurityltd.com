//Importing helper functions
import * as utils from "react";
import { Fade } from "react-reveal";

//Importing core components
import Heading from "components/UI/Heading/Heading";
import Manage from "./sections/Manage";
import Services from "../../../Solutions/sections/ManageServices/sections/Services";

//Importing styles
import styles from "./style.module.css";

const ManageCategories = ({ data, refetchData }) => {
  const [item, setItem] = utils.useState(null);

  return (
    <>
      <Fade bottom>
        <div className={styles.ManageServices}>
          <Heading
            title={`Categories Available In Database.(${data.length})`}
          />
          <Services
            data={data}
            setId={(value) => {
              const obj = data.filter((item) => item.SK === value)[0];
              setItem(obj ? obj : null);
            }}
            refetchData={refetchData}
          />
          <Heading
            title={item ? "Edit Category Details." : "Publish New Category."}
          />
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

export default ManageCategories;
