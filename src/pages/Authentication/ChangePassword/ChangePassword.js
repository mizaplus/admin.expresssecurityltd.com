//Importing helper functions
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  capitalize,
  multiUpdate,
  update,
  validateData,
} from "../../../utils/modules";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Importing core components
import Alert from "../../../components/Alert/Alert";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

//Importing styles
import styles from "../Login/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChangePassword = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });

  const [ui, setUi] = useState({
    loading: false,
    error: false,
    alert: false,
  });
  const navigator = useNavigate();

  useEffect(() => {
    if (!user) {
      navigator("/auth/login");
    } else {
      update("username", user.username, setData);
    }
  }, [navigator, user]);

  const change = () => {
    if (validateData(data)) {
      setUi({ loading: true, error: false, alert: false });
      Auth.currentAuthenticatedUser()
        .then(
          Auth.changePassword(user, data.oldPassword, data.newPassword)
            .then(() => {
              multiUpdate(
                ["loading", "alert"],
                [false, "Password Changed Successfully."],
                setUi
              );
              setTimeout(() => {
                navigator("/dashboard");
              }, 4000);
            })
            .catch((error) => {
              setUi({ loading: false, error: error.message, alert: false });
            })
        )
        .catch((error) => {
          setUi({ loading: false, error: error.message, alert: false });
        });
    } else {
      window.alert("Some fields are missing");
    }
  };

  return (
    <div className={styles.Login}>
      <Alert
        open={ui.alert}
        color={"success"}
        message={ui.alert}
        clicked={() => navigator("/auth/login")}
      />
      <Alert
        open={data.isUnConfirmed}
        color={"notification"}
        message={data.isUnConfirmed}
        clicked={() => navigator("/auth/confirm-account")}
      />
      <Alert
        open={ui.error}
        color={"error"}
        message={ui.error}
        clicked={() => update("error", false, setUi)}
      />
      <div className={styles.card}>
        <h3>Apply New Password.</h3>
        <form>
          <Input
            title="Username"
            type="text"
            icon={"icofont-user-alt-5"}
            disabled
            value={capitalize(data.username)}
            onTextChange={(value) => update("username", value, setData)}
          />
          <Input
            title="Old Password"
            type="password"
            icon={"icofont-key"}
            disabled={ui.loading}
            value={data.oldPassword}
            onTextChange={(value) => update("oldPassword", value, setData)}
          />
          <Input
            title="New Password"
            type="password"
            icon={"icofont-key"}
            disabled={ui.loading}
            value={data.newPassword}
            onTextChange={(value) => update("newPassword", value, setData)}
          />
          <div className={styles.links}>
            <Link to={ui.loading ? "#" : "/dashbaord"}>
              <FontAwesomeIcon icon={faLongArrowAltLeft} /> Back to Dashbaord
            </Link>
            <a
              href="/"
              onClick={(e) => e.preventDefault()}
              style={{ opacity: 0 }}
            >
              none
            </a>
          </div>
          <div className={styles.submitBox}>
            <Button
              title="Change Password"
              color={"success"}
              loading={ui.loading}
              clicked={() => change()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
