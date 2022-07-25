//Importing helper functions
import * as utils from "react";
import api from "utils/axios.config";
import { Auth } from "aws-amplify";
import { extractObjectKeys, partitionData } from "utils/modules";
import { notification } from "Theme";
import { useRef, useState } from "react";

//Importing core components
import { Fade } from "react-reveal";
import { Grid } from "@mui/material";
import { Store } from "react-notifications-component";
import Confirm from "components/UI/Confirm/Confirm";
import CustomPagination from "components/Pagination/Pagination";
import Loader from "components/UI/Loader/Loader";
import NoData from "components/UI/NoData/NoData";

//Importing styles
import styles from "../styles.module.css";

const Projects = ({ data, setItem, refetchData }) => {
  const [projects, setProjects] = utils.useState(null);
  const [index, setIndex] = utils.useState(0);

  utils.useEffect(() => {
    if (data.length) {
      setProjects(partitionData(data, 3));
    }
  }, [data]);

  const [confirm, setConfrim] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemId = useRef(null);

  const deleteProject = async (value) => {
    const { PK, SK, after_image, before_image } = data.filter(
      (item) => item.SK === itemId.current
    )[0];
    const payload = { PK, SK };
    const text = after_image + (before_image ? before_image : "");
    payload["images"] = extractObjectKeys(text);
    if (value) {
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
    <div className={styles.Projects}>
      <Confirm
        open={confirm}
        onChange={(value) => deleteProject(value)}
        setOpen={setConfrim}
        title={"Are you sure?"}
        message={"Once you delete this service, it will be gone forever."}
      />
      {loading ? (
        <Loader message={"Deleting Service, Please Wait..."} />
      ) : (
        <>
          {!projects ? (
            <NoData dark />
          ) : (
            <Grid container spacing={3}>
              {projects[index].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={Math.random()}>
                  <Fade>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url("${item.after_image}")`,
                        }}
                      />
                      <div className={styles.info}>
                        <p>{item.heading}</p>
                        <button
                          className={styles.btnFull}
                          onClick={() => {
                            document.getElementById("edit").scrollIntoView();
                            setItem(item);
                          }}
                        >
                          Edit Project
                        </button>
                        <button
                          className={styles.btnGhost}
                          onClick={() => {
                            itemId.current = item.SK;
                            setConfrim(true);
                          }}
                        >
                          Delete Project
                        </button>
                      </div>
                    </div>
                  </Fade>
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4}>
                <CustomPagination
                  pages={projects.length}
                  handleChange={(value) => setIndex(value - 1)}
                />
              </Grid>
            </Grid>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;