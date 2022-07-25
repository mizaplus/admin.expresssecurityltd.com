import Navbar from "components/Navbar/Navbar";
import Sidebar from "components/Sidebar/Sidebar";
import classNames from "classnames";
import styles from "./styles.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.box}>
      <Navbar
        open={true}
      />
      <Sidebar open={true} />
      <div className={classNames(styles.children, styles.open)}>{children}</div>
    </div>
  );
};

export default Layout;
