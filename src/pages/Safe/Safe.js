//Importing helper functions
import * as utils from "react";
import api from "utils/axios.config";
import { Auth } from "aws-amplify";

//Importing core components
import Root from "./sections/Root";
import Loader from "components/UI/Loader/Loader";
import Error from "components/Error/Error";
import { Fade } from "react-reveal";

const Safe = () => {
  const [page, setPage] = utils.useState({
    loading: false,
    error: false,
    data: false,
  });
  const [refetch, setRefetch] = utils.useState(true);

  utils.useEffect(() => {
    if (refetch) {
      const getData = async () => {
        setPage((prevState) => ({ ...prevState, loading: true, error: null }));
        try {
          const token = (await Auth.currentSession())
            .getIdToken()
            .getJwtToken();
          const { data } = await api.get("/safe-keeping", {
            headers: { Authorization: token },
          });
          setPage((prevState) => ({
            ...prevState,
            loading: false,
            data: data,
          }));
        } catch (err) {
          setPage((prevState) => ({
            ...prevState,
            loading: false,
            error: err.message,
          }));
        }
      };
      getData();
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

export default Safe;
