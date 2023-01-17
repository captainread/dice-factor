import "./index.css";

import * as React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Categories from "./components/Categories";
import ErrorPage from "./components/ErrorPage";
import FilteredReviews from "./components/Reviews/FilteredReviews";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import ReviewDetails from "./components/Reviews/ReviewDetails";
import Reviews from "./components/Reviews/Reviews";
import SignIn from "./components/SignIn";
import { UserContext } from "./utilities/contexts";
import { appTheme } from "./utilities/theme";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  });

  return (
    <BrowserRouter basename={"/dice-factor"}>
      <React.Fragment>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          <UserContext.Provider value={{ user, setUser }}>
            <div className="App">
              <Nav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/api" element={<Home />} />
                <Route path="/api/profile" element={<Profile />} />
                <Route path="/api/sign-in" element={<SignIn />} />
                <Route path="/api/reviews" element={<Reviews />} />
                <Route path="/api/categories" element={<Categories />} />
                <Route path="/api/reviews/:review_id" element={<ReviewDetails />} />
                <Route path=":pathcategory" element={<FilteredReviews />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/*" element={<ErrorPage />} />
                <Route path="" element={<ErrorPage />} />
              </Routes>
            </div>
          </UserContext.Provider>
        </ThemeProvider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
