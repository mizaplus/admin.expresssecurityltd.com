//Importing helper functions
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

//Importing styles
import styles from "../../../Services/sections/ManageHeader/styles.module.css";
import "react-activity/dist/Dots.css";

const ManageHeader = ({ data, refetchData }) => {
  const [form, setForm] = utils.useState({
    heading: data.heading,
    image: data.image,
    subHeading: data.subHeading,
    metaTitle: data.metaTitle,
    metaDesc: data.metaDesc,
  });
  const [loading, setLoading] = utils.useState(false);
  const [freeze, freezeApp] = utils.useState(false);
  const [oldImg, setImage] = utils.useState(null);

  const submit = async () => {
    const payload = generateData(data, form);
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
      <div className={styles.ManageHeader}>
        <Heading title={"Edit Header Section And Meta Info."} />
        <div className={styles.box}>
          <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Input
                  title="Page Title"
                  icon={"icofont-code-alt"}
                  maxLength={60}
                  disabled={loading || freeze}
                  value={form.metaTitle}
                  onTextChange={(value) => update("metaTitle", value, setForm)}
                />
                <Input
                  title="Page Description"
                  icon={"icofont-code-alt"}
                  maxLength={120}
                  disabled={loading || freeze}
                  value={form.metaDesc}
                  onTextChange={(value) => update("metaDesc", value, setForm)}
                />
                <Input
                  title="Heading"
                  icon={"icofont-heading"}
                  maxLength={60}
                  disabled={loading || freeze}
                  value={form.heading}
                  onTextChange={(value) => update("heading", value, setForm)}
                />
                <Input
                  title="Sub Heading"
                  icon={"icofont-heading"}
                  maxLength={60}
                  disabled={loading || freeze}
                  value={form.subHeading}
                  onTextChange={(value) => update("heading", value, setForm)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ImageUploader
                  title="Background Image"
                  image={form.image}
                  oldImg={oldImg}
                  edit={true}
                  md={true}
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
      </div>
    </Fade>
  );
};

export default ManageHeader;
