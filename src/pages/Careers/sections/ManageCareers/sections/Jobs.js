//Importing helper functions
import api from "utils/axios.config";
import { Auth } from "aws-amplify";
import { extractObjectKeys } from "utils/modules";
import { notification } from "Theme";
import { Store } from "react-notifications-component";
import { useRef, useState } from "react";

//Importing core components
import { Container, Grid } from "@mui/material";
import Confirm from "components/UI/Confirm/Confirm";
import Loader from "components/UI/Loader/Loader";
import NoData from "components/UI/NoData/NoData";

//Importing styles
import styles from "pages/Services/sections/ManageServices/styles.module.css";
import Job from "components/UI/Job/Job";

const Jobs = ({ data, setId, refetchData }) => {
  const [confirm, setConfrim] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemId = useRef(null);

  const deleteJob = async (value) => {
    const { PK, SK, image, information } = data.filter(
      (item) => item.SK === itemId.current
    )[0];
    const payload = { PK, SK };
    const text = information + image;
    payload["images"] = extractObjectKeys(text);
    if (value) {
      document.getElementById("box").scrollIntoView();
      setLoading(true);
      try {
        const token = (await Auth.currentSession()).getIdToken().getJwtToken();
        const res = await api.delete("/update", {
          data: payload,
          headers: { Authorization: token },
        });
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
      }
      setLoading(false);
    }
    itemId.current = null;
  };

  return (
    <div className={styles.box} id="box">
      <Confirm
        open={confirm}
        onChange={(value) => deleteJob(value)}
        setOpen={setConfrim}
        title={"Are you sure?"}
        message={"Once you delete this service, it will be gone forever."}
      />
      {loading ? (
        <Loader message={"Deleting Service, Please Wait..."} />
      ) : (
        <Container maxWidth="lg">
          {!data.length ? (
            <NoData dark />
          ) : (
            <Grid container spacing={3}>
              {data.map((item) => (
                <Grid item xs={12} sm={6} >
                  <Job
                    edit
                    item={item}
                    onEdit={(id) => {
                      document.getElementById("edit").scrollIntoView();
                      setId(id);
                    }}
                    onDelete={(id) => {
                      itemId.current = id;
                      setConfrim(true);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      )}
    </div>
  );
};

export default Jobs;
