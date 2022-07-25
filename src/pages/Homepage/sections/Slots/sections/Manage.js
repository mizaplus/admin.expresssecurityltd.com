//Importin helper functions
import * as utils from "react";
import api from "utils/axios.config";
import { Auth } from "aws-amplify";
import { notification } from "Theme";
import { update } from "utils/modules";
import { validateData } from "utils/modules";

//Importing core components
import { Container, Grid } from "@mui/material";
import { Dots } from "react-activity";
import { generateData } from "utils/modules";
import { Store } from "react-notifications-component";
import Input from "components/Input/Input";

//Importing styles
import styles from "../styles.module.css";

const Manage = ({ item, setItem, refetchData }) => {
  const [form, setForm] = utils.useState({
    SK: null,
    heading: "",
    description: "",
    icon: "",
  });

  const [loading, setLoading] = utils.useState(false);

  utils.useEffect(() => {
    if (item) {
      setForm({
        SK: item.SK,
        heading: item.heading,
        icon: item.icon,
        description: item.description,
      });
    }
  }, [item]);

  const submit = async () => {
    const payload = generateData(item, form);
    if (Object.keys(payload).length > 0) {
      const validity = validateData(payload);
      if (validity.valid) {
        setLoading(true);
        try {
          const token = (await Auth.currentSession())
            .getIdToken()
            .getJwtToken();
          const res = await api.patch(
            "/update",
            { ...payload, PK: "HOMEPAGE" },
            {
              headers: { Authorization: token },
            }
          );
          setLoading(false);
          Store.addNotification({
            ...notification,
            title: "Done",
            type: "Success",
            message: res.data,
            onRemoval: () => refetchData(),
          });
        } catch (error) {
          setLoading(false);
          Store.addNotification({
            ...notification,
            title: "Error",
            type: "danger",
            message: error.message,
          });
        }
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
    <div className={styles.main} id="form">
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Input
              title="Heading"
              icon={"icofont-heading"}
              maxLength={40}
              disabled={loading || !item}
              value={form.heading}
              onTextChange={(value) => update("heading", value, setForm)}
            />
            <Input
              title="Icon"
              icon={"icofont-code"}
              maxLength={30}
              disabled={loading || !item}
              value={form.icon}
              onTextChange={(value) => update("icon", value, setForm)}
            />
            <Input
              title="Description"
              type="textarea"
              maxLength={105}
              disabled={loading || !item}
              value={form.description}
              onTextChange={(value) => update("description", value, setForm)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.preview}>
            {form.SK ? (
              <div className={styles.grid}>
                <i className={form.icon}></i>
                <h4>{form.heading}</h4>
                <p>{form.description}</p>
              </div>
            ) : (
              <div className={styles.none}>
                <p>Select A Slot First.</p>
              </div>
            )}
          </Grid>
          <Grid item xs={4}>
            <button className={styles.btn2} onClick={submit} disabled={loading}>
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
  );
};

export default Manage;
