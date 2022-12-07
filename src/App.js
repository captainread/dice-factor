import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/theme";
// import { useState } from "react";
// import { UserContext } from "./components/contexts";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import ReviewDetails from "./components/ReviewDetails";
import Categories from "./components/Categories";
import Breadcrumb from "./components/Breadcrumb";


function App() {
  // const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <React.Fragment>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          {/* <UserContext.Provider value={{ user, setUser }}> */}
          <div className="App">
            <Nav />
            {/* <Breadcrumb /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/api/reviews" element={<Reviews />} />
              <Route path="/api/categories" element={<Categories />} />
              <Route
                path="/api/reviews/:review_id"
                element={<ReviewDetails />}
              />
            </Routes>
          </div>
          {/* </UserContext.Provider> */}
        </ThemeProvider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
