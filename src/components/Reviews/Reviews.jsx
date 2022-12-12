import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import ReviewCard from "./ReviewCard";
import { fetchReviews } from "../../utilities/api";

export default function Reviews() {
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews(sortType, sortOrder)
      .then((reviews) => {
        setFetchedReviews(reviews);
        setIsLoading(false);
      })
      .catch(() => {
        navigate("/error");
      });
  }, [sortType, sortOrder, navigate]);

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
