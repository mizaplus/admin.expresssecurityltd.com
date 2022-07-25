/* eslint-disable */
//Importing helper functions
import { Auth } from "aws-amplify";
import { AuthSuccess, setUser } from "../../../store/Actions/actionTypes";
import { useState } from "react";
import { multiUpdate, update, validateData } from "../../../utils/modules";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Importing core components
import Alert from "../../../components/Alert/Alert";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

//Importing styles
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    isUnConfirmed: false,
  });
  const [ui, setUi] = useState({
    loading: false,
    error: false,
    alert: false,
  });
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onLogIn = () => {
    if (
      validateData({ username: data.username, passwrd: data.password }).valid
    ) {
      setUi({ loading: true, error: false, alert: false });
      Auth.signIn({ username: data.username, password: data.password })
        .then((user) => {
          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            dispatch(setUser(user));
            update(
              "isUnConfirmed",
              "Account Confirmation Is Required.",
              setData
            );
            multiUpdate(
              ["loading", "alert"],
              [false, "User Confirmation Required."],
              setUi
            );
            setTimeout(() => {
              navigator("/auth/confirm-account");
            }, 4000);
          } else {
            multiUpdate(
              ["loading", "alert"],
              [false, "Credentials Authenticated Successfully."],
              setUi
            );
            setTimeout(() => {
              dispatch(AuthSuccess(user));
            }, 4000);
          }
        })
        .catch((error) => {
          setUi({ loading: false, error: error.message, alert: false });
        });
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
        message={ui.alert ? ui.alert : ""}
        clicked={() => update("alert", false, setUi)}
      />
      <Alert
        open={data.isUnConfirmed}
        color={"info"}
        message={data.isUnConfirmed ? data.isUnConfirmed : ""}
        clicked={() => navigator("/auth/confirm-account")}
      />
      <Alert
        open={ui.error}
        color={"error"}
        message={ui.error ? ui.error : ""}
        clicked={() => update("error", false, setUi)}
      />
      <div className={styles.card}>
        <h3>Log Into Your Account.</h3>
        <form>
          <Input
            title="Username"
            type="text"
            disabled={ui.loading}
            value={data.username}
            icon={"icofont-user-alt-5"}
            onTextChange={(value) => update("username", value, setData)}
          />
          <Input
            title="Password"
            type="password"
            disabled={ui.loading}
            value={data.password}
            icon={"icofont-key"}
            onTextChange={(value) => update("password", value, setData)}
          />
          <div className={styles.links}>
            <Link to={ui.loading ? "#" : "/auth/forgot-password"}>
              Forgot Password?
            </Link>
            <a href={ui.loading ? "#" : "https://www.arthurbyara.com"}>
              Not Admin, Leave Page
            </a>
          </div>
          <div className={styles.submitBox}>
            <Button
              title="Log In"
              color={"primary"}
              loading={ui.loading}
              clicked={() => onLogIn()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
