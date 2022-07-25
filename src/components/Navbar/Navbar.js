import { Auth } from "aws-amplify";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "store/Actions/actionTypes";
import styles from "./styles.module.css";

const Navbar = () => {
  const [userdata, setData] = useState(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    Auth.currentUserInfo()
      .then((res) => setData(res.attributes))
      .catch((err) => console.log(err.message));
  }, []);

  const logout = () => {
    if (window.confirm("Proceed To Logout?")) {
      dispatch(logoutUser());
    }
  };

  const changePassword = () => navigator("/auth/change-password");

  return (
    <div className={classNames(styles.navbar, styles.open)}>
      <div>
        <div className={styles.userBox}>
          <p>{userdata && userdata.preferred_username}</p>
          <i className="icofont-user-alt-5"></i>
        </div>
        <ul className={styles.nav}></ul>
      </div>
      <div style={{ width: "auto", display: "flex" }}>
        <span onClick={changePassword} className={styles.changePassword}>
          <i className="icofont-user"></i> <p>Change Password</p>
        </span>
        <span onClick={logout} className={styles.logout}>
          <i className="icofont-logout"></i> <p>Logout</p>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
