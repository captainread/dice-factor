import { fetchReviewsByCategory } from "../utilities/api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { formatCat } from "../utilities/util";
import ReviewCard from "./ReviewCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function FilteredReviews({ match, location }) {
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useSearchParams();
  const currCategory = queryParams.get("category");

  useEffect(() => {
    if (currCategory) {
      fetchReviewsByCategory(currCategory).then((reviews) => {
        setFetchedReviews(reviews);
        setIsLoading(false);
      });
    }
  }, [currCategory]);

  if (isLoading) {
    return (
      <main className="loading-wrap">
        <span className="loading">Loading...</span>
      </main>
    );
  }

  return (
    <Box id="all-page" sx={{ width: "100%" }}>
      <header>
        <h2>{formatCat(currCategory)}</h2>
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
