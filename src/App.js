import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./utilities/theme";
import { useState } from "react";

import { UserContext } from "./utilities/contexts";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import ReviewDetails from "./components/ReviewDetails";
import Categories from "./components/Categories";
import FilteredReviews from "./components/FilteredReviews";

function App() {
  const [user, setUser] = useState({
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  });

  return (
    <BrowserRouter>
      <React.Fragment>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          <UserContext.Provider value={{ user, setUser }}>
            <div className="App">
              <Nav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/api/reviews" element={<Reviews />} />
                <Route path="/api/categories" element={<Categories />} />
                <Route
                  path="/api/reviews/:review_id"
                  element={<ReviewDetails />}
                />
                <Route
                  path=":pathcategory"
                  element={<FilteredReviews />}
                />
                <Route path="*" element={<p>Error: path not resolved</p>} />
              </Routes>
            </div>
          </UserContext.Provider>
        </ThemeProvider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
