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
import Dots from "react-activity/dist/Dots";

//Importing styles
import styles from "pages/Services/sections/ManageServices/styles.module.css";
import "react-activity/dist/Dots.css";
import Editor from "components/Editor/Editor";
import Confirm from "components/UI/Confirm/Confirm";

const Manage = ({ id, data, setItem, refetchData }) => {
  const [form, setForm] = utils.useState({
    heading: "",
    description: "",
    image: "",
    metaTitle: "",
    metaDesc: "",
    information: "",
    job_type: "",
    place: "",
    speciality: "",
  });
  const [loading, setLoading] = utils.useState(false);
  const [freeze, freezeApp] = utils.useState(false);
  const [confirm, setConfirm] = utils.useState(false);

  utils.useEffect(() => {
    if (id) {
      setForm({
        heading: data.heading,
        description: data.description,
        image: data.image,
        metaTitle: data.metaTitle ? data.metaTitle : "",
        metaDesc: data.metaDesc ? data.metaDesc : "",
        information: data.information,
        job_type: data.job_type,
        place: data.place,
        speciality: data.speciality,
      });
    } else {
      setForm({
        heading: "",
        description: "",
        image: "",
        metaTitle: "",
        metaDesc: "",
        information: "",
        job_type: "",
        place: "",
        speciality: "",
      });
    }
  }, [id]);

  const submit = async () => {
    const payload = form;
    const validity = validateData(payload);
    if (validity.valid) {
      freezeApp(true);
      setLoading(true);
      try {
        const token = (await Auth.currentSession()).getIdToken().getJwtToken();
        const res = await api.post(
          "/careers",
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
            "/update",
            { ...payload, PK: "CAREERS", SK: id },
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
      document.getElementById("edit").scrollIntoView();
      setItem(null);
    }
  };

  return (
    <div className={styles.Manage} id="edit">
      <Confirm
        open={confirm}
        setOpen={setConfirm}
        title={"Release Changes?"}
        message={"All your changes will be lost and this is irreversible."}
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
              title="Job Name"
              icon={"icofont-heading"}
              maxLength={60}
              disabled={loading || freeze}
              value={form.heading}
              onTextChange={(value) => update("heading", value, setForm)}
            />
            <Input
              title="Job Description"
              type={"textarea"}
              maxLength={160}
              disabled={loading || freeze}
              value={form.description}
              onTextChange={(value) => update("description", value, setForm)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              title="Job Type"
              icon={"icofont-heading"}
              maxLength={60}
              disabled={loading || freeze}
              value={form.job_type}
              onTextChange={(value) => update("job_type", value, setForm)}
            />
            <Input
              title="Location"
              icon={"icofont-location-pin"}
              maxLength={60}
              disabled={loading || freeze}
              value={form.place}
              onTextChange={(value) => update("place", value, setForm)}
            />
            <Input
              title="Speciality"
              icon={"icofont-worker"}
              maxLength={60}
              disabled={loading || freeze}
              value={form.speciality}
              onTextChange={(value) => update("speciality", value, setForm)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Editor
              title="Job Details *"
              content={form.information}
              readOnly={freeze}
              setLoading={setLoading}
              onChange={(value) => update("information", value, setForm)}
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
                "Save Job"
              )}
            </button>
          </Grid>
          {id && (
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
