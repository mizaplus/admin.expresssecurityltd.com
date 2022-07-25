//Importing helper functions
import api from "utils/axios.config";
import * as utils from "react";

//Importing core components
import Root from "./sections/Root/Root";
import Loader from "components/UI/Loader/Loader";
import Error from "components/Error/Error";
import { Fade } from "react-reveal";

const Testimonials = () => {
  const [page, setPage] = utils.useState({
    loading: false,
    error: false,
    data: false,
  });
  const [refetch, setRefetch] = utils.useState(true);

  utils.useEffect(() => {
    if (refetch) {
      setPage((prevState) => ({ ...prevState, loading: true, error: null }));
      api
        .get("/testimonials")
        .then((res) => {
          setPage((prevState) => ({
            ...prevState,
            loading: false,
            data: res.data,
          }));
        })
        .catch((err) =>
          setPage((prevState) => ({
            ...prevState,
            loading: false,
            error: err.message,
          }))
        );
      setRefetch(false);
    }
  }, [refetch]);

  if (page.loading)
    return (
      <Fade>
        <Loader />
      </Fade>
    );

  if (page.error)
    return <Error title={page.error} refetchData={() => setRefetch(true)} />;

  return (
    <>
      {page.data && (
        <Root data={page.data} refetchData={() => setRefetch(true)} />
      )}
    </>
  );
};

export default Testimonials;
