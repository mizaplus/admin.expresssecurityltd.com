//Importing helper functions
import api from "utils/axios.config";
import * as utils from "react";
import { update } from "utils/modules";
import { Auth } from "aws-amplify";

//Importing core components
import Loader from "components/UI/Loader/Loader";
import Error from "components/Error/Error";
import Cards from "./sections/Cards";
import Database from "./sections/Database";
import styles from "./styles.module.css";
import AuthData from "./sections/AuthData";

const Dashboard = () => {
  const [data, setData] = utils.useState(null);
  const [ui, setUi] = utils.useState({ loading: false, error: false });
  const [refetch, setRefetch] = utils.useState(true);

  utils.useEffect(() => {
    if (refetch) {
      const getData = async () => {
        setUi({ loading: true, error: false });
        try {
          const token = (await Auth.currentSession())
            .getIdToken()
            .getJwtToken();
          const res = await api.get(`/dashboard`, {
            headers: { Authorization: token },
          });
          setData(res.data);
          setRefetch(false);
          update("loading", false, setUi);
        } catch (err) {
          setUi({ loading: false, error: err.message });
          setRefetch(false);
        }
      };
      getData();
    }
  }, [refetch]);

  return (
    <>
      {ui.loading && <Loader text={"Loading Data, Please Wait ..."} />}
      {ui.error && !ui.loading && (
        <Error text={ui.error} refetchData={() => setRefetch(true)} />
      )}
      {data && !ui.loading && !ui.error && (
        <div className={styles.Dashboard}>
          <Cards data={data.performance} />
          <Database entries={data.database} />
          <AuthData data={data.authentication} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
