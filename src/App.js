import "./index.css";
// import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
// import { UserContext } from "./components/contexts";
import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Nav from "./components/Nav";
import { appTheme } from "./themes/theme";

function App() {
  // const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <React.Fragment>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          {/* <UserContext.Provider value={{ user, setUser }}> */}
          <div className="App">
            <header className="App-header"></header>
            <Nav />
          </div>
          {/* </UserContext.Provider> */}
        </ThemeProvider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
