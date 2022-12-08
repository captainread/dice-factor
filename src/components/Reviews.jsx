import * as React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { fetchReviews, fetchCategories, fetchReviewsByCategory } from "../utilities/api";
import ReviewCard from "./ReviewCard";
import Breadcrumb from "./Breadcrumb";

export default function Reviews() {
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedCats, setFetchedCats] = useState([]);
  const [currCategory, setCurrCategory] = useState("");

  useEffect(() => {
    fetchReviews().then((reviews) => {
      setFetchedReviews(reviews);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCategories().then((cats) => {
      setFetchedCats(cats);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <main className="loading-wrap">
        <span className="loading">Loading...</span>
      </main>
    );
  }

  const handleChange = (event) => {
    setCurrCategory(event.target.value);
    console.log(currCategory)
    fetchReviewsByCategory(currCategory).then((reviews) => {
      setFetchedReviews(reviews);
      setIsLoading(false);
    });
  };

  return (
    <Box id="all-page" sx={{ width: "100%" }}>
      <header>
        <h2>All Reviews</h2>
      </header>
      <Box sx={{ minWidth: 120 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="filter-category">Category</InputLabel>
          <Select
            labelId="filter-category"
            id="filter-category"
            onChange={handleChange}
            label="Age"
            defaultValue=""
          >
            <MenuItem value="">
              <em>Unfiltered</em>
            </MenuItem>
            {fetchedCats.map((category, index) => {
              return (
                <MenuItem value={category.slug} key={index}>
                  {category.slug}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 1, md: 8 }}
      >
        <ReviewCard fetchedReviews={fetchedReviews} />
      </Grid>
    </Box>
  );
}
