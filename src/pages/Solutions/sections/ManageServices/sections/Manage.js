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
import Input from "components/Input/Input";
import ImageUploader from "components/UI/ImageUploader/ImageUploader";
import Dots from "react-activity/dist/Dots";
import Editor from "components/Editor/Editor";
import Confirm from "components/UI/Confirm/Confirm";

//Importing styles
import styles from "../styles.module.css";
import "react-activity/dist/Dots.css";

const Manage = ({ id, data, setItem, refetchData }) => {
  const [form, setForm] = utils.useState({
    heading: "",
    description: "",
    image: "",
    metaTitle: "",
    metaDesc: "",
    details: "",
  });
  const [loading, setLoading] = utils.useState(false);
  const [freeze, freezeApp] = utils.useState(false);
  const [oldImg, setImage] = utils.useState(null);
  const [confirm, setConfirm] = utils.useState(false);
  const [isValid, setValidity] = utils.useState(false);

  utils.useEffect(() => {
    setForm({
      heading: data ? data.heading : "",
      description: data ? data.description : "",
      image: data ? data.image : "",
      metaTitle: data ? data.metaTitle : "",
      metaDesc: data ? data.metaDesc : "",
      details: data ? data.details : "",
    });
  }, [data]);

  utils.useEffect(() => {
    if (
      form.SK ||
      form.heading ||
      form.description ||
      form.metaTitle ||
      form.image ||
      form.metaDesc ||
      form.details
    ) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  }, [form]);

  const submit = async () => {
    const payload = form;
    const validity = validateData(payload);
    if (validity.valid) {
      freezeApp(true);
      setLoading(true);
      try {
        const token = (await Auth.currentSession()).getIdToken().getJwtToken();
        const res = await api.post(
          "/solutions",
          { ...payload },
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
  };

  const updateData = async () => {
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
            "/",
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

  const reset = (value) => {
    if (value) {
      if (data) {
        document.getElementById("edit").scrollIntoView();
        setItem(null);
      } else {
        setForm({
          heading: "",
          description: "",
          image: "",
          metaTitle: "",
          metaDesc: "",
          details: "",
        });
      }
    }
  };

  return (
    <div className={styles.Manage} id="edit">
      <Confirm
        open={confirm}
        setOpen={setConfirm}
        title={"Release Changes?"}
        message={"All your changes will be lost and this is irriversible."}
        onChange={(value) => reset(value)}
      />
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              title="Meta Description"
              icon={"icofont-code-alt"}
              maxLength={160}
              disabled={loading || freeze}
              value={form.metaDesc}
              onTextChange={(value) => update("metaDesc", value, setForm)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              title="Service Name"
              icon={"icofont-heading"}
              maxLength={60}
              disabled={loading || freeze}
              value={form.heading}
              onTextChange={(value) => update("heading", value, setForm)}
            />
            <Input
              title="Service Description"
              type={"textarea"}
              maxLength={160}
              disabled={loading || freeze}
              value={form.description}
              onTextChange={(value) => update("description", value, setForm)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ImageUploader
              title="Service Image"
              image={form.image}
              edit={id}
              oldImg={oldImg}
              setOldImage={setImage}
              updateFormField={setForm}
              disabled={freeze || loading}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Editor
              title="Service Details *"
              content={form.details}
              readOnly={freeze}
              setLoading={setLoading}
              onChange={(value) => update("details", value, setForm)}
            />
          </Grid>
          <Grid item xs={4}>
            <button
              className={styles.btn}
              onClick={id ? updateData : submit}
              disabled={loading || freeze}
            >
              {loading ? (
                <Dots color="#fff" size={16} speed={1} animating={true} />
              ) : id ? (
                "Update Changes"
              ) : (
                "Save Service"
              )}
            </button>
          </Grid>

          {isValid && (
            <Grid item xs={4} style={{ display: !loading ? "block" : "none" }}>
              <button
                className={styles.btnReset}
                onClick={() => setConfirm(true)}
                disabled={loading || freeze}
              >
                Cancel
              </button>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Manage;
