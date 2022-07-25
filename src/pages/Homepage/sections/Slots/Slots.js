//Importing helper functions
import * as utils from "react";

//Importing core components
import Listings from "./sections/Listings";
import Heading from "components/UI/Heading/Heading";
import Wrapper from "components/UI/Wrapper/Wrapper";
import { Fade } from "react-reveal";
import Manage from "./sections/Manage";

const Slots = ({ data, refetchData }) => {
  const [item, setItem] = utils.useState(null);

  return (
    <Fade bottom>
      <Wrapper>
        <Heading title={`Avalable Slots.(${data.length})`} />
        <Listings data={data} setItem={setItem} />
        <Heading title={"Edit Slots Data."} />
        <Manage item={item} setItem={setItem} refetchData={refetchData} />
      </Wrapper>
    </Fade>
  );
};

export default Slots;
