import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#324fa7",
    },
    secondary: {
      main: "#4169e1",
    },
  },
  typography: {
    fontFamily: "Nunito",
  },
});

export const notification = {
  insert: "top",
  container: "bottom-right",
  animationIn: ["animate__animated", "animate__fadeInRight"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 7000,
    pauseOnHover: true,
    onScreen: true,
    showIcon: true
  },
};

export default theme;
