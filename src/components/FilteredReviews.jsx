import { fetchReviewsByCategory } from "../utilities/api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { formatCat } from "../utilities/util";
import ReviewCard from "./ReviewCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function FilteredReviews() {
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams] = useSearchParams();
  const currCategory = queryParams.get("category");
  const [sortType, setSortType] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (currCategory) {
      fetchReviewsByCategory(currCategory, sortType, sortOrder).then(
        (reviews) => {
          setFetchedReviews(reviews);
          setIsLoading(false);
        }
      );
    }
  }, [currCategory, sortType, sortOrder]);

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
      <header>
        <h2>{formatCat(currCategory)} Game Reviews</h2>
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
              <MenuItem value={"created_at"}>Date</MenuItem>
              <MenuItem value={"votes"}>Votes</MenuItem>
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
