import * as React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { fetchReviews } from "../utilities/api";
import ReviewCard from "./ReviewCard";
import Breadcrumb from "./Breadcrumb";

export default function Reviews() {
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews().then((reviews) => {
      setFetchedReviews(reviews);
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

  return (
    <Box id="review-page" sx={{ flexGrow: 1 }}>
      <header>
        <h2>All Reviews</h2>
      </header>

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
