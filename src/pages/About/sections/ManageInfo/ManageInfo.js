//Importing helper functions
import * as utils from "react";
import api from "utils/axios.config";
import { Auth } from "aws-amplify";
import { generateData, validateData } from "utils/modules";
import { notification } from "Theme";
import { Store } from "react-notifications-component";
import { update } from "utils/modules";

//Importing core components
import Heading from "components/UI/Heading/Heading";
import Editor from "components/Editor/Editor";
import Input from "components/Input/Input";
import { Dots } from "react-activity";
import { Grid } from "@mui/material";

//Importing styles
import styles from "./styles.module.css";

const ManageInfo = ({ data, refetchData }) => {
  const [form, setForm] = utils.useState({
    heading: data.heading,
    information: data.information,
  });

  const [loading, setLoading] = utils.useState(false);
  const [freeze, freezeApp] = utils.useState(false);

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
    <div className={styles.ManageInfo}>
      <Heading title={"Edit Company Background."} />
      <div className={styles.box}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={9}>
            <Input
              title="Heading"
              icon={"icofont-heading"}
              maxLength={60}
              disabled={loading || freeze}
              value={form.heading}
              onTextChange={(value) => update("heading", value, setForm)}
            />
            <Editor
              title="Company Information *"
              content={form.information}
              readOnly={freeze}
              setLoading={setLoading}
              onChange={(value) => update("information", value, setForm)}
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
      </div>
    </div>
  );
};

export default ManageInfo;
