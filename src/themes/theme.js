import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#45cbb2",
    },
    secondary: {
      light: "#0066ff",
      main: "#45cbb2",
      contrastText: "#3e2f34",
    },

    // custom: {
    //   light: "#ffa726",
    //   main: "#f57c00",
    //   dark: "#ef6c00",
    //   contrastText: "rgba(0, 0, 0, 0.87)",
    // },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
