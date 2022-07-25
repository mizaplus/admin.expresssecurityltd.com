//Importing helper functions
import * as utils from "react";
import api from "utils/axios.config";
import { Auth } from "aws-amplify";
import { extractObjectKeys } from "utils/modules";
import { notification } from "Theme";
import { partitionData } from "utils/modules";

//Importing core components
import CustomPagination from "components/Pagination/Pagination";
import Confirm from "components/UI/Confirm/Confirm";
import Loader from "components/UI/Loader/Loader";
import Review from "components/Review/Review";
import { Container, Grid } from "@mui/material";
import { Fade } from "react-reveal";
import { Store } from "react-notifications-component";

//Importing styles
import styles from "../styles.module.css";

const Testimonials = ({ data, setId, refetchData }) => {
  const [index, setIndex] = utils.useState(0);
  const [reviews, setReview] = utils.useState(null);
  const [confirm, setConfrim] = utils.useState(false);
  const [loading, setLoading] = utils.useState(false);
  const itemId = utils.useRef(null);

  utils.useEffect(
    () => setReview(partitionData(data.testimonials, 3)),
    [data.testimonials]
  );

  const deleteService = async (value) => {
    const { PK, SK, image } = data.testimonials.filter(
      (item) => item.SK === itemId.current
    )[0];
    const payload = { PK, SK };
    if (image) {
      payload["images"] = extractObjectKeys(image);
    }
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
    <Container maxWidth="lg" id="box">
      <Confirm
        open={confirm}
        onChange={(value) => deleteService(value)}
        setOpen={setConfrim}
        title={"Are you sure?"}
        message={"Once you delete this service, it will be gone forever."}
      />
      {loading ? (
        <Loader message={"Deleting Service, Please Wait..."} />
      ) : (
        <>
          {reviews && (
            <Fade>
              <div  className={styles.box}>
              <Grid container spacing={4}>
                {reviews[index].map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.SK}>
                    <Review
                      item={item}
                      edit
                      onSelect={(id) => setId(id)}
                      onDelete={(id) => {
                        itemId.current = id;
                        setConfrim(true);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <CustomPagination
                pages={reviews.length}
                handleChange={(value) => setIndex(value - 1)}
              />
              </div>
            </Fade>
          )}
        </>
      )}
    </Container>
  );
};

export default Testimonials;
