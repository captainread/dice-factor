import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#45cbb2",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
