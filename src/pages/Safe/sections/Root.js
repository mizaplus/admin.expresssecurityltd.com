//Importing helper functions
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { toMoney, validateData, partitionData } from "utils/modules";
import api from "utils/axios.config";
import classNames from "classnames";
import useClipboard from "react-use-clipboard";

//Importing core components
import { Dots } from "react-activity";
import { CSVLink } from "react-csv";
import { Container, Grid } from "@mui/material";
import { notification } from "Theme";
import { Store } from "react-notifications-component";
import { update } from "utils/modules";
import { Fade } from "react-reveal";
import Input from "components/Input/Input";
import Heading from "components/UI/Heading/Heading";

//Importing styles
import styles from "./styles.module.css";
import Loader from "components/UI/Loader/Loader";

const Root = ({ data, refetchData }) => {
  const [form, setForm] = useState({
    depositor_name: "",
    date_deposited: `${
      new Date().getMonth() + 1
    }-${new Date().getDate()}-${new Date().getFullYear()}`,
    goods: "",
    quantity: "",
    daily_cost: "",
    total_cost: "",
  });
  const [loading, setLoading] = useState(false);
  const [freeze, freezeApp] = useState(false);
  const [rows, setRows] = useState(null);
  const [page, setPage] = useState(0);
  const [code, setCode] = useState(null);
  const [isCopied, setCopied] = useClipboard(code);

  useEffect(() => {
    if (data.length > 0) {
      setRows(partitionData(data, 6));
    } else {
      setRows(data);
    }
  }, [data]);

  const submit = async () => {
    const payload = form;
    const validity = validateData(payload);
    if (validity.valid) {
      setLoading(true);
      try {
        const token = (await Auth.currentSession()).getIdToken().getJwtToken();
        const res = await api.post(
          "/safe-keeping",
          { ...payload },
          {
            headers: { Authorization: token },
          }
        );
        setCode(res.data.code);
        Store.addNotification({
          ...notification,
          title: "Done",
          type: "Success",
          message: res.data.message,
        });
      } catch (error) {
        Store.addNotification({
          ...notification,
          title: "Error",
          type: "danger",
          message: error.message,
        });
      }
      setLoading(false);
    } else {
      Store.addNotification({
        ...notification,
        title: "Error",
        type: "danger",
        message: `${validity.message} missing`,
      });
    }
  };

  const deleteItem = async (value) => {
    if (window.confirm("This action is irreversible")) {
      const { PK, SK } = data.filter((item) => item.SK === value)[0];
      const payload = { PK, SK };
      if (value) {
        freezeApp(true);
        try {
          const token = (await Auth.currentSession())
            .getIdToken()
            .getJwtToken();
          const res = await api.delete("/", {
            data: payload,
            headers: { Authorization: token },
          });
          Store.addNotification({
            ...notification,
            title: "Done",
            type: "Success",
            message: res.data,
            onRemoval: () => refetchData(),
          });
          freezeApp(false);
        } catch (error) {
          Store.addNotification({
            ...notification,
            title: "Error",
            type: "danger",
            message: error.message,
          });
          freezeApp(false);
        }
        setLoading(false);
      }
    }
  };

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
    <div className={styles.Root}>
      <Heading title={`Add New Item.`} />
      <div className={styles.box}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              {code && (
                <Fade>
                  <div className={styles.clipboard} onClick={setCopied}>
                    <p>{code}</p>
                    <i
                      onClick={isCopied ? () => refetchData() : setCopied}
                      className={"icofont-close-circled"}
                    ></i>
                  </div>
                </Fade>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                disabled={loading || freeze || code}
                title="Deposited By"
                type="text"
                value={form.depositor_name}
                onTextChange={(value) =>
                  update("depositor_name", value, setForm)
                }
                icon="icofont-user-alt-4"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                disabled={loading || freeze || code}
                title="Date Deposited"
                type="date"
                value={form.date_deposited}
                onTextChange={(value) =>
                  update("date_deposited", value, setForm)
                }
                icon="icofont-calendar"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                disabled={loading || freeze || code}
                title="Nature Of Goods"
                type="text"
                value={form.goods}
                onTextChange={(value) => update("goods", value, setForm)}
                icon="icofont-cart"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                disabled={loading || freeze || code}
                title="Quantity"
                type="text"
                value={form.quantity}
                onTextChange={(value) => update("quantity", value, setForm)}
                icon="icofont-numbered"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                disabled={loading || freeze || code}
                title="Daily Cost"
                type="number"
                icon="icofont-money-bag"
                value={form.daily_cost}
                onTextChange={(value) => update("daily_cost", value, setForm)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                disabled={loading || freeze || code}
                title="Total Cost"
                type="number"
                icon="icofont-money"
                value={form.total_cost}
                onTextChange={(value) => update("total_cost", value, setForm)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <button
                className={styles.btn}
                onClick={submit}
                disabled={loading || freeze || code}
              >
                {loading ? (
                  <Dots color="#fff" size={16} speed={1} animating={true} />
                ) : (
                  "Submit Entry."
                )}
              </button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Heading title={`Items In Archieve.(${data.length})`} />
      <div className={styles.box}>
        <Container maxWidth="lg">
          {freeze ? (
            <Fade bottom>
              <Loader message="Deleting Item, Please Wait" />
            </Fade>
          ) : (
            <Fade bottom>
              <div className={styles.graph}>
                <div className={styles.header}>
                  <div>
                    <p className={styles.tagline}>Storage Engine: Dynamo DB</p>
                    <h4 className={styles.title}>
                      Total Items Stored.({data.length})
                    </h4>
                  </div>
                </div>
                <table className={styles.DataTable}>
                  <thead>
                    <tr className={styles.thead}>
                      <th>
                        <p>Deposited By</p>
                      </th>
                      <th>
                        <p>Date Deposited</p>
                      </th>
                      <th>
                        <p>Goods</p>
                      </th>
                      <th>
                        <p>Quantity</p>
                      </th>
                      <th>
                        <p>Daily Cost</p>
                      </th>
                      <th>
                        <p>Total Cost</p>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows &&
                      rows[page].map((item) => (
                        <tr className={styles.trow} key={Math.random()}>
                          <td>
                            <p>{item.depositor_name}</p>
                          </td>
                          <td>
                            <p>{item.date_deposited}</p>
                          </td>
                          <td>
                            <p className={styles.success}>
                              <i className={"icofont-cart"}></i> {item.goods}
                            </p>
                          </td>
                          <td>
                            <p className={styles.success}>
                              <i className={"icofont-check-circled"}></i>{" "}
                              {item.quantity}
                            </p>
                          </td>
                          <td style={{ padding: "0rem !important" }}>
                            <div className={styles.confirmed}>
                              <p>
                                <i className={"icofont-money-bag"}></i>
                                {toMoney(item.daily_cost)}
                              </p>
                            </div>
                          </td>
                          <td>
                            <p>
                              <i className={"icofont-money"}></i>{" "}
                              {toMoney(item.total_cost)}
                            </p>
                          </td>
                          <td>
                            <p onClick={deleteItem.bind(this, item.SK)}>
                              <i
                                className={classNames(
                                  "icofont-close",
                                  styles.close
                                )}
                              ></i>
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
                        { label: "Deposited By", key: "depositor_name" },
                        { label: "Date Deposited", key: "date_deposited" },
                        { label: "Goods", key: "goods" },
                        { label: "Quantity", key: "quantity" },
                        { label: "Daily Cost", key: "daily_cost" },
                        { label: "Total Cost", key: "total_cost" },
                      ]}
                      data={data.map((item) => ({
                        depositor_name: item.depositor_name,
                        date_deposited: item.date_deposited,
                        goods: item.goods,
                        quantity: item.quantity,
                        daily_cost: item.daily_cost,
                        total_cost: item.total_cost,
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
            </Fade>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Root;
