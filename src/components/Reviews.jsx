import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";

import { fetchReviews } from "../utilities/api";
import ReviewCard from "./ReviewCard";

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
    <Box id="all-page" sx={{ width: "100%" }}>
      <header id="all-reviews">
        <h2 >All Reviews</h2>
        <Tooltip id="filter-tip" title="Click here to filter by category.">
          <Link to="/api/categories">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Link>
        </Tooltip>
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
