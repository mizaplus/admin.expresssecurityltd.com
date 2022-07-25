import * as utils from "react";
import api from "utils/axios.config";
import { Auth } from "aws-amplify";
import { generateData } from "utils/modules";
import { notification } from "Theme";
import { Store } from "react-notifications-component";
import { update } from "utils/modules";
import { validateData } from "utils/modules";

//Importing core components
import { Container, Grid } from "@mui/material";
import { Fade } from "react-reveal";
import Dots from "react-activity/dist/Dots";
import Input from "components/Input/Input";
import ImageUploader from "components/UI/ImageUploader/ImageUploader";
import Heading from "components/UI/Heading/Heading";
import Wrapper from "components/UI/Wrapper/Wrapper";

//Importing styles
import styles from "./styles.module.css";

const About = ({ data, refetchData }) => {
  const [form, setForm] = utils.useState({
    heading: data.heading,
    subHeading: data.subHeading,
    description: data.description,
    image: data.image,
    highlight1: data.highlights[0],
    highlight2: data.highlights[1],
    highlight3: data.highlights[2],
    highlight4: data.highlights[3],
  });
  const [loading, setLoading] = utils.useState(false);
  const [freeze, freezeApp] = utils.useState(false);
  const [oldImg, setImage] = utils.useState(null);

  const submit = async () => {
    const currentData = {
      heading: form.heading,
      subHeading: form.subHeading,
      description: form.description,
      image: form.image,
    };
    const payload = generateData(data, currentData);
    payload.highlights = [
      form.highlight1,
      form.highlight2,
      form.highlight3,
      form.highlight4,
    ];
    if (Object.keys(payload).length > 0) {
      const validity = validateData(payload);
      if (validity.valid) {
        freezeApp(true);
        setLoading(true);
        try {
          const token = (await Auth.currentSession())
            .getIdToken()
            .getJwtToken();
          const res = await api.patch(
            "/update",
            { ...payload, PK: data.PK, SK: data.SK },
            {
              headers: { Authorization: token },
            }
          );
          Store.addNotification({
            ...notification,
            title: "Done",
            type: "Success",
            message: res.data,
            onRemoval: () => refetchData(),
          });
        } catch (error) {
          Store.addNotification({
            ...notification,
            title: "Error",
            type: "danger",
            message: error.message,
          });
          freezeApp(false);
        }
        setLoading(false);
      } else {
        Store.addNotification({
          ...notification,
          title: "Error",
          type: "danger",
          message: `${validity.message} missing`,
        });
      }
    } else {
      Store.addNotification({
        ...notification,
        title: "Info",
        type: "default",
        message: "No Changes Detected",
      });
    }
  };

  return (
    <Fade bottom>
      <Wrapper>
        <Heading title="Edit About Info" />
        <div className={styles.box}>
          <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Input
                  title="Heading"
                  icon={"icofont-heading"}
                  maxLength={60}
                  disabled={loading || freeze}
                  value={form.heading}
                  onTextChange={(value) => update("heading", value, setForm)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  title="Sub Heading"
                  icon={"icofont-heading"}
                  maxLength={60}
                  disabled={loading || freeze}
                  value={form.subHeading}
                  onTextChange={(value) => update("subHeading", value, setForm)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  title="Slot 1"
                  icon={"icofont-heading"}
                  maxLength={32}
                  disabled={loading || freeze}
                  value={form.highlight1}
                  onTextChange={(value) => update("highlight1", value, setForm)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  title="Slot 1"
                  icon={"icofont-heading"}
                  maxLength={32}
                  disabled={loading || freeze}
                  value={form.highlight2}
                  onTextChange={(value) => update("highlight2", value, setForm)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  title="Slot 3"
                  icon={"icofont-heading"}
                  maxLength={32}
                  disabled={loading || freeze}
                  value={form.highlight3}
                  onTextChange={(value) => update("highlight3", value, setForm)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  title="Slot 4"
                  icon={"icofont-heading"}
                  maxLength={32}
                  disabled={loading || freeze}
                  value={form.highlight4}
                  onTextChange={(value) => update("highlight4", value, setForm)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  title="Description"
                  type={"textarea"}
                  maxLength={280}
                  lg={true}
                  disabled={loading || freeze}
                  value={form.description}
                  onTextChange={(value) =>
                    update("description", value, setForm)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ImageUploader
                  title="Background Image"
                  image={form.image}
                  oldImg={oldImg}
                  edit={true}
                  setOldImage={setImage}
                  updateFormField={setForm}
                  disabled={freeze || loading}
                />
              </Grid>
              <Grid item xs={4}>
                <button
                  className={styles.btn}
                  onClick={submit}
                  disabled={loading || freeze}
                >
                  {loading ? (
                    <Dots color="#fff" size={16} speed={1} animating={true} />
                  ) : (
                    "Update Changes"
                  )}
                </button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Wrapper>
    </Fade>
  );
};

export default About;
