//Importing helper functions
import { Auth } from "aws-amplify";
import { AuthSuccess } from "store/Actions/actionTypes";
import { AuthFailure } from "store/Actions/actionTypes";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//Importing core components
import Layout from "components/Layout/Layout";
import { ReactNotifications } from "react-notifications-component";

//Importing auth pages
import Login from "pages/Authentication/Login/Login";
import ConfirmAccount from "pages/Authentication/ConfirmAccount/ConfirmAccount";
import ForgotPassword from "pages/Authentication/ForgotPassword/ForgotPassword";

//Importing data pages
import Categories from "pages/Categories/Categories";
import Products from "pages/Products/Products";
import Safe from "pages/Safe/Safe";
import Solutions from "pages/Solutions/Solutions";

//Importing theming
import Theme from "./Theme";

function App() {
  const AuthState = useSelector((state) => state.AuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        dispatch(AuthSuccess(user));
      })
      .catch(() => dispatch(AuthFailure()));
  }, [dispatch]);

  return (
    <>
      <ReactNotifications />
      {!AuthState ? (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/confirm-account" element={<ConfirmAccount />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/safe-keeping"
            element={
              <Layout>
                <Safe />
              </Layout>
            }
          />
          <Route
            path="/categories"
            element={
              <Layout>
                <Categories />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <Products />
              </Layout>
            }
          />
          <Route
            path="/solutions"
            element={
              <Layout>
                <Solutions />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/categories" replace />} />
        </Routes>
      )}
    </>
  );
}

const Root = () => {
  return (
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  );
};

export default Root;
