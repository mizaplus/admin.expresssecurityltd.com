//Importing helper functions
import { Auth } from "aws-amplify";
import { useState } from "react";
import {
  capitalize,
  multiUpdate,
  update,
  validateData,
} from "../../../utils/modules";
import { Link, useNavigate } from "react-router-dom";

//Importing core components
import Alert from "../../../components/Alert/Alert";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

//Importing styles
import styles from "../Login/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForgotPassword = () => {
  const [data, setData] = useState({
    username: "",
    code: "",
    password: "",
  });
  const [get_code, setMode] = useState(true);

  const [ui, setUi] = useState({
    loading: false,
    error: false,
    alert: false,
  });

  const navigator = useNavigate();

  const reset = () => {
    setUi({ loading: true, error: false, alert: false });
    if (get_code) {
      Auth.forgotPassword(data.username)
        .then((data) => {
          console.log(data);
          multiUpdate(
            ["loading", "alert"],
            [false, "Reset Code Sent To Email."],
            setUi
          );
          setTimeout(() => {
            setMode(false);
          }, 4000);
        })
        .catch((err) => {
          multiUpdate(["loading", "error"], [false, err.message], setUi);
        });
    } else {
      if (validateData(data).valid) {
        if (window.confirm(`Your new password will be: ${data.password}`)) {
          Auth.forgotPasswordSubmit(data.username, data.code, data.password)
            .then(() => {
              multiUpdate(
                ["loading", "alert"],
                [false, "Password Reset Successfully."],
                setUi
              );
              setTimeout(() => {
                navigator("/auth/login");
              }, 3000);
            })
            .catch((err) =>
              multiUpdate(["loading", "error"], [false, err.message], setUi)
            );
        } else {
          setUi({ loading: false, error: false, alert: false });
        }
      } else {
        multiUpdate(
          ["loading", "error"],
          [false, "All fields are required please."],
          setUi
        );
      }
    }
  };

  return (
    <div className={styles.Login}>
      <Alert
        open={ui.alert}
        color={"success"}
        message={ui.alert}
        clicked={() => {
          update("alert", false, setUi);
          setMode(false);
        }}
      />
      <Alert
        open={ui.error}
        color={"error"}
        message={ui.error}
        clicked={() => update("error", false, setUi)}
      />
      <div className={styles.card}>
        <h3>Reset Password.</h3>
        <form>
          <Input
            title="Username"
            type="text"
            icon={"icofont-user-alt-5"}
            disabled={ui.loading || !get_code}
            value={capitalize(data.username)}
            onTextChange={(value) => update("username", value, setData)}
          />
          {!get_code && (
            <>
              {" "}
              <Input
                title="Password"
                type="password"
                icon={"icofont-key"}
                disabled={ui.loading}
                value={data.password}
                onTextChange={(value) => update("password", value, setData)}
              />
              <Input
                title="Reset Code"
                type="text"
                icon={"icofont-refresh"}
                disabled={ui.loading}
                value={data.code}
                onTextChange={(value) => update("code", value, setData)}
              />
            </>
          )}
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
              title={get_code ? "Request Code" : "Reset Password"}
              color={get_code ? "warning" : "success"}
              loading={ui.loading}
              clicked={() => reset()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
