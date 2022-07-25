//Importing helper functions
import { Auth } from "aws-amplify";
import { AuthSuccess } from "../../../store/Actions/actionTypes";
import { useEffect, useState } from "react";
import {
  capitalize,
  compareStrings,
  multiUpdate,
  update,
  validateData,
} from "../../../utils/modules";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Importing core components
import Alert from "../../../components/Alert/Alert";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

//Importing styles
import styles from "../Login/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmAccount = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState({
    username: "",
    password: "",
    password2: "",
    phone_number: "",
  });

  const [ui, setUi] = useState({
    loading: false,
    error: false,
    alert: false,
  });
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    if (!user) {
      navigator("/auth/login");
    } else {
      update("username", user.username, setData);
    }
  }, [navigator, user]);

  const confirm = () => {
    if (validateData(data).valid) {
      if (compareStrings(data.password, data.password2)) {
        setUi({ loading: true, error: false, alert: false });
        Auth.completeNewPassword(user, data.password, {
          phone_number: data.phone_number,
        })
          .then((res) => {
            dispatch(AuthSuccess(res));
            multiUpdate(
              ["loading", "alert"],
              [false, "Account Confirmed Successfully."],
              setUi
            );
            setTimeout(() => {
              navigator("/auth/login");
            }, 4000);
          })
          .catch((error) => {
            setUi({ loading: false, error: error.message, alert: false });
          });
      } else {
        multiUpdate(
          ["loading", "error"],
          [false, "Password Not Matching."],
          setUi
        );
      }
    } else {
      multiUpdate(
        ["loading", "error"],
        [false, "All fields are required please."],
        setUi
      );
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
        <h3>Confirm Your Account.</h3>
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
            title="Phone Number"
            type="text"
            icon={"icofont-phone"}
            disabled={ui.loading}
            value={data.phone_number}
            onTextChange={(value) => update("phone_number", value, setData)}
          />
          <Input
            title="Password"
            type="password"
            icon={"icofont-key"}
            disabled={ui.loading}
            value={data.password}
            onTextChange={(value) => update("password", value, setData)}
          />
          <Input
            title="Confirm Password"
            type="password"
            icon={"icofont-key"}
            disabled={ui.loading}
            value={data.password2}
            onTextChange={(value) => update("password2", value, setData)}
          />
          <div className={styles.links}>
            <Link to={ui.loading ? "#" : "/auth/login"}>
              <FontAwesomeIcon icon={faLongArrowAltLeft} /> Back to login
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
              title="Confirm Account"
              color={"success"}
              loading={ui.loading}
              clicked={() => confirm()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmAccount;
