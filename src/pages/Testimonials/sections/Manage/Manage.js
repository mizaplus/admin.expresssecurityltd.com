//Importing helper functions
import * as utils from "react";

//Importing core components
import { Fade } from "react-reveal";
import Heading from "components/UI/Heading/Heading";
import ManageData from "./sections/ManageData";
import Testimonials from "./sections/Testimonials";

//Importing styles
import styles from "./styles.module.css";

const Manage = ({ data, refetchData }) => {
  const [item, setItem] = utils.useState(null);
  return (
    <Fade bottom>
      <div className={styles.ManageData}>
        <Heading
          title={`Available Testimonials.(${data.testimonials.length})`}
        />
        <Testimonials
          data={data}
          setId={(value) => {
            const obj = data.testimonials.filter(
              (item) => item.SK === value
            )[0];
            setItem(obj ? obj : null);
          }}
          refetchData={refetchData}
        />
        <Heading title={item ? `Edit Review.` : "Publish New Review."} />
        <ManageData
          id={item ? item.SK : null}
          data={item}
          setItem={(value) => setItem(value)}
          refetchData={refetchData}
        />
      </div>
    </Fade>
  );
};

export default Manage;
