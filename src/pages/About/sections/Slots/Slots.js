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
import { Fade } from "react-reveal";
import { Store } from "react-notifications-component";
import Heading from "components/UI/Heading/Heading";
import Input from "components/Input/Input";

//Importing styles
import styles from "./styles.module.css";

const Slots = ({ data, refetchData }) => {
  const [form, setForm] = utils.useState({
    SK: null,
    heading: "",
    description: "",
    icon: "",
  });

  const [loading, setLoading] = utils.useState(false);

  const selectSlot = (item) => {
    document.getElementById("form").scrollIntoView();
    setForm({
      SK: item.SK,
      heading: item.heading,
      icon: item.icon,
      description: item.description,
    });
  };

  const submit = async () => {
    const item = data.filter((item) => item.SK === form.SK)[0];
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
            { ...payload, PK: "ABOUT" },
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
    <Fade bottom>
      <div className={styles.Box}>
        <Heading title="Edit Slot Data." />
        <div className={styles.main}>
          <Grid container spacing={3}>
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={Math.random()}>
                <div className={styles.slot}>
                  <i className={item.icon}></i>
                  <h3>{item.heading}</h3>
                  <p>{item.description}</p>
                  <button
                    className={styles.btn}
                    onClick={() => selectSlot(item)}
                  >
                    Edit
                  </button>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
        <Heading title="Edit Details." />
        <div className={styles.main} id="form">
          <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Input
                  title="Heading"
                  icon={"icofont-heading"}
                  maxLength={40}
                  disabled={loading || !form.SK}
                  value={form.heading}
                  onTextChange={(value) => update("heading", value, setForm)}
                />
                <Input
                  title="Icon"
                  icon={"icofont-code"}
                  maxLength={30}
                  disabled={loading || !form.SK}
                  value={form.icon}
                  onTextChange={(value) => update("icon", value, setForm)}
                />
                <Input
                  title="Description"
                  type="textarea"
                  maxLength={100}
                  disabled={loading || !form.SK}
                  value={form.description}
                  onTextChange={(value) =>
                    update("description", value, setForm)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className={styles.preview}>
                {form.SK ? (
                  <div className={styles.slot2}>
                    <i className={form.icon}></i>
                    <h3>{form.heading}</h3>
                    <p>{form.description}</p>
                  </div>
                ) : (
                  <div className={styles.none}>
                    <p>Select A Slot First.</p>
                  </div>
                )}
              </Grid>
              <Grid item xs={4}>
                <button
                  className={styles.btn2}
                  onClick={submit}
                  disabled={loading}
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

export default Slots;
