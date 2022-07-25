//Importing helper functions
import * as utils from "react";
import classNames from "classnames";
import { routes } from "routes";

//Importing core components
import { NavLink } from "react-router-dom";
import logo from "assets/img/logo.png";

//Importing styles
import styles from "./styles.module.css";

const Sidebar = ({ open }) => {
  const [currentPath, setPathname] = utils.useState(null);

  utils.useEffect(() => {
    const { pathname } = window.location;
    setPathname(pathname);
  }, []);

  return (
    <div
      className={
        open
          ? classNames(styles.sidebar, styles.open)
          : classNames(styles.sidebar, styles.closed)
      }
    >
      <div className={styles.logoBox}>
        <img src={logo} alt="" />
      </div>
      <ul className={styles.links}>
        <li className={styles.header}>CONTENT MANAGEMENT</li>
        {currentPath &&
          routes.map((route) => (
            <li key={route.pathname}>
              <NavLink
                onClick={() => setPathname(route.pathname)}
                className={
                  currentPath === route.pathname
                    ? classNames(styles.active, styles.navlink)
                    : styles.navlink
                }
                to={route.pathname}
              >
                <i className={route.icon}></i> <p>{route.title}</p>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
