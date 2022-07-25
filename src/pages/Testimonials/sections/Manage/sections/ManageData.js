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
import { Rating } from "react-simple-star-rating";
import Confirm from "components/UI/Confirm/Confirm";
import Dots from "react-activity/dist/Dots";
import Input from "components/Input/Input";
import ImageUploader from "components/UI/ImageUploader/ImageUploader";

//Importing styles
import styles from "../styles.module.css";
import "react-activity/dist/Dots.css";

const ManageData = ({ id, data, setItem, refetchData }) => {
  const [form, setForm] = utils.useState({
    client_name: "",
    client_message: "",
    rating: "",
    image: "",
  });
  const [loading, setLoading] = utils.useState(false);
  const [freeze, freezeApp] = utils.useState(false);
  const [oldImg, setImage] = utils.useState(null);
  const [confirm, setConfirm] = utils.useState(false);

  utils.useEffect(() => {
    if (id) {
      setForm({
        client_name: data.client_name,
        client_message: data.client_message,
        image: data.image,
        rating: data.rating,
      });
    } else {
      setForm({
        client_name: "",
        client_message: "",
        rating: "",
        image: "",
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
          "/testimonials",
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
      document.getElementById("edit").scrollIntoView();
      setItem(null);
    }
  };

  return (
    <div className={styles.ManageBox} id="edit">
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
              title="Client Name"
              icon={"icofont-heading"}
              maxLength={60}
              disabled={loading || freeze}
              value={form.client_name}
              onTextChange={(value) => update("client_name", value, setForm)}
            />
            <Input
              title="Client Review"
              type={"textarea"}
              maxLength={260}
              disabled={loading || freeze}
              value={form.client_message}
              onTextChange={(value) => update("client_message", value, setForm)}
            />
            <label>Rating *</label>
            <div className={styles.rating}>
              <Rating
                size={15}
                fillColor={"#f1a545"}
                ratingValue={form.rating}
                onClick={(value) => update("rating", value, setForm)}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ImageUploader
              title="Client Photo"
              image={form.image}
              edit={id}
              oldImg={oldImg}
              small
              setOldImage={setImage}
              updateFormField={setForm}
              disabled={freeze || loading}
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
                "Save Review"
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

export default ManageData;
