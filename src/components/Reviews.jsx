import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import { fetchReviews } from "../utilities/api";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState("votes");
  const [sortOrder, setSortOrder] = useState("desc");

  let searchParams = { sort_by: sortType, order: sortOrder };

  useEffect(() => {
    fetchReviews(searchParams).then((reviews) => {
      setFetchedReviews(reviews);
      setIsLoading(false);
    });
  }, [sortType, sortOrder]);

  if (isLoading) {
    return (
      <main className="loading-wrap">
        <span className="loading">Loading...</span>
      </main>
    );
  }

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <Box id="all-page" sx={{ width: "100%" }}>
      <header id="all-reviews">
        <h2>All Reviews</h2>
        <Tooltip id="filter-tip" title="Click here to filter by category.">
          <Link to="/api/categories">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Link>
        </Tooltip>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortType}
              label="Sort By"
              onChange={handleChange}
            >
              <MenuItem value={"votes"}>Votes</MenuItem>
              <MenuItem value={"created_at"}>Date</MenuItem>
              <MenuItem value={"comment_count"}>Comments</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControl>
          <RadioGroup row defaultValue="desc">
            <FormControlLabel
              value="desc"
              control={<Radio onChange={handleRadioChange} />}
              label="Descending"
            />
            <FormControlLabel
              value="asc"
              control={<Radio onChange={handleRadioChange} />}
              label="Ascending"
            />
          </RadioGroup>
        </FormControl>
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
