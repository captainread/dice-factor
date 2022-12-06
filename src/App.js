import "./index.css";
// import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
// import { UserContext } from "./components/contexts";
import * as React from "react";
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import Nav from "./components/Nav";
import { appTheme } from "./themes/theme";
import Reviews from "./components/Reviews";
import Header from "./components/Header";

function App() {
  // const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <React.Fragment>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          {/* <UserContext.Provider value={{ user, setUser }}> */}
          <div className="App">
            {/* <Nav />
            <Header />
            <Reviews /> */}
          </div>
          {/* </UserContext.Provider> */}
        </ThemeProvider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
