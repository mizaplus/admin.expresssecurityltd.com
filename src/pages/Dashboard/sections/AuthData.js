//Importing helper functions
import { useState, useEffect } from "react";
import { partitionData } from "../../../utils/modules";

//Importing core components
import { CSVLink } from "react-csv";

//Importing styles
import styles from "../styles.module.css";

const AuthData = ({ data }) => {
  const [rows, setRows] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      const result = partitionData(data, 6);
      setRows(result);
    } else {
      setRows(null);
    }
  }, [data]);

  const prev = () => {
    if (page !== 0) {
      setPage((prev) => prev - 1);
    }
  };

  const next = () => {
    if (page !== rows.length - 1) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.graph}>
      <div className={styles.header}>
        <div>
          <p className={styles.tagline}>Auth Engine: Cognito</p>
          <h4 className={styles.title}>Past Auth Sessions.</h4>
        </div>
      </div>
      <table className={styles.DataTable}>
        <thead>
          <tr className={styles.thead}>
            <th>
              <p>Username</p>
            </th>
            <th>
              <p>Email</p>
            </th>
            <th>
              <p>Email Status</p>
            </th>
            <th>
              <p>Confirmation Status</p>
            </th>
            <th>
              <p>Date</p>
            </th>
            <th>
              <p>Time</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows &&
            rows[page].map((item) => (
              <tr className={styles.trow} key={Math.random()}>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{item.email}</p>
                </td>
                <td>
                  <p
                    className={
                      item.emailStatus ? styles.success : styles.danger
                    }
                  >
                    <i
                      className={
                        item.emailStatus
                          ? "icofont-check-circled"
                          : "icofont-close-circled"
                      }
                    ></i>{" "}
                    {item.emailStatus ? "Verified" : "Not Verified"}
                  </p>
                </td>
                <td style={{ padding: "0rem !important" }}>
                  <div
                    className={
                      item.accountStatus === "CONFIRMED"
                        ? styles.confirmed
                        : styles.unconfirmed
                    }
                  >
                    <p>{item.accountStatus.toLowerCase()}</p>
                  </div>
                </td>
                <td>
                  <p>
                    <i className="icofont-calendar"></i> {item.date}
                  </p>
                </td>
                <td>
                  <p>
                    <i className="icofont-clock-time"></i>{" "}
                    {item.time}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {rows && (
        <div className={styles.TableFooter}>
          <CSVLink
            headers={[
              { label: "Username", key: "name" },
              { label: "Email", key: "email" },
              { label: "Email Verified", key: "emailStatus" },
              { label: "Account Status", key: "accountStatus" },
              { label: "Date", key: "date" },
              { label: "Time", key: "time" },
            ]}
            data={data.map((item) => ({
              name: item.name,
              email: item.email,
              emailStatus: item.emailStatus,
              accountStatus: item.accountStatus,
              time: item.time.split(",")[0],
              date: item.date,
            }))}
          >
            <i className="icofont-download"></i>
          </CSVLink>
          <p>
            {page + 1} of {rows.length}
          </p>
          <div onClick={() => prev()}>
            <i className="icofont-simple-left"></i>
          </div>
          <div onClick={() => next()}>
            <i className="icofont-simple-right"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthData;
