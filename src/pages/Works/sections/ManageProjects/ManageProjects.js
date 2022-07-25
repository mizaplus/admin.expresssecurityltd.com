//Importing helper functions
import * as utils from "react";

//Importing core components
import Heading from "components/UI/Heading/Heading";
import Manage from "./sections/Manage";
import Projects from "./sections/Projects";
import Wrapper from "components/UI/Wrapper/Wrapper";
import { Fade } from "react-reveal";

const ManageProjects = ({ data, refetchData }) => {
  const [item, setItem] = utils.useState(null);

  return (
    <Fade bottom>
      <Wrapper>
        <Heading title={`Avalable Projects.(${data.length})`} />
        <Projects data={data} setItem={setItem} refetchData={refetchData} />
        <Heading
          title={item ? "Edit Projects Details." : "Publish New Project."}
        />
        <Manage item={item} setItem={setItem} refetchData={refetchData} />
      </Wrapper>
    </Fade>
  );
};

export default ManageProjects;
