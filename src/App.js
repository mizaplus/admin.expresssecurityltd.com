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
import Dashboard from "pages/Dashboard/Dashboard";
import Homepage from "pages/Homepage/Homepage";
import Services from "pages/Services/Services";
import Careers from "pages/Careers/Careers";
import Testimonials from "pages/Testimonials/Testimonials";
import About from "pages/About/About";
import Works from "pages/Works/Works";

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
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/homepage"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
          <Route
            path="/services"
            element={
              <Layout>
                <Services />
              </Layout>
            }
          />
          <Route
            path="/testimonials"
            element={
              <Layout>
                <Testimonials />
              </Layout>
            }
          />
          <Route
            path="/careers"
            element={
              <Layout>
                <Careers />
              </Layout>
            }
          />
          <Route
            path="/works"
            element={
              <Layout>
                <Works />
              </Layout>
            }
          />
          <Route
            path="/about-info"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
