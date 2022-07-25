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
import Confirm from "components/UI/Confirm/Confirm";
import Dots from "react-activity/dist/Dots";
import Input from "components/Input/Input";
import ImageUploader from "components/UI/ImageUploader/ImageUploader";
import { Grid, Container } from "@mui/material";

//Importing styles
import styles from "../styles.module.css";

const Manage = ({ item, setItem, refetchData }) => {
  const [form, setForm] = utils.useState({
    SK: item ? item.SK : null,
    heading: item ? item.heading : "",
    before_image: item ? item.before_image : "",
    after_image: item ? item.after_image : "",
  });

  const [loading, setLoading] = utils.useState(false);
  const [freeze, freezeApp] = utils.useState(false);
  const [confirm, setConfirm] = utils.useState(false);
  const [isValid, setValidity] = utils.useState(false);
  const [oldImg, setImage] = utils.useState(null);
  const [oldImg2, setImage2] = utils.useState(null);

  utils.useEffect(() => {
    if (form.SK || form.heading || form.after_image || form.before_image) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  }, [form]);

  utils.useEffect(() => {
    if (item) {
      setForm({
        SK: item.SK,
        heading: item.heading,
        before_image: item.before_image,
        after_image: item.after_image,
      });
    } else {
      setForm({
        SK: null,
        heading: "",
        before_image: "",
        after_image: "",
      });
    }
  }, [item]);

  const submit = async () => {
    const payload = { heading: form.heading, after_image: form.after_image };
    const validity = validateData(payload);
    if (validity.valid) {
      if (form.before_image) {
        payload.before_image = form.before_image;
      }
      freezeApp(true);
      setLoading(true);
      try {
        const token = (await Auth.currentSession()).getIdToken().getJwtToken();
        const res = await api.post(
          "/works",
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
    const payload = generateData(item, form);
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
            { ...payload, PK: item.PK, SK: item.SK },
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
      if (item) {
        setItem(null);
      } else {
        setForm({
          SK: null,
          heading: "",
          before_image: "",
          after_image: "",
        });
      }
    }
  };

  return (
    <div className={styles.box} id="edit">
      <Confirm
        open={confirm}
        setOpen={setConfirm}
        title={"Release Changes?"}
        message={"All your changes will be lost and this is irriversible."}
        onChange={(value) => reset(value)}
      />
      <Container maxWidth="lg">
        <Grid container justifyContent={"center"} spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Input
              title="Details"
              icon={"icofont-heading"}
              maxLength={60}
              disabled={loading || freeze}
              value={form.heading}
              onTextChange={(value) => update("heading", value, setForm)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ImageUploader
              title="Image Before"
              image={form.before_image}
              oldImg={oldImg}
              field={"before_image"}
              edit={form.SK}
              setOldImage={setImage}
              updateFormField={setForm}
              disabled={freeze || loading}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ImageUploader
              title="Image After"
              image={form.after_image}
              oldImg={oldImg2}
              edit={form.SK}
              field={"after_image"}
              setOldImage={setImage2}
              updateFormField={setForm}
              disabled={freeze || loading}
            />
          </Grid>
          <Grid item xs={4}>
            <button
              className={styles.btn}
              onClick={item ? updateData : submit}
              disabled={loading || freeze}
            >
              {loading ? (
                <Dots color="#fff" size={16} speed={1} animating={true} />
              ) : item ? (
                "Update Changes"
              ) : (
                "Save Project"
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
