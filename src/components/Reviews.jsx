import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { fetchReviews } from "../utilities/api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Reviews() {
  const [fetchedReviews, setFetchedReviews] = useState([]);

  useEffect(() => {
    fetchReviews().then((reviews) => {
      setFetchedReviews(reviews);
    });
  }, []);

  return (
    <Box id="review-page" sx={{ flexGrow: 1 }}>
      <h2>All Reviews</h2>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 1, md: 8 }}
      >
        {/* {Array.from(Array(8)).map((_, index) => (

        ))} */}
        {fetchedReviews.map((review, index) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item className="review-card">
                <h3>{review.title}</h3>
                <img className="review-img" src={review.review_img_url} />
                <p id="review-body">
                  {review.review_body.replace(/(.{80})..+/, "$1...")}
                </p>
                <Link to={`/api/reviews/${review.review_id}`}>
                  <Button className="read-more" variant="contained" endIcon={<ReadMoreIcon />}>
                    Read More
                  </Button>
                </Link>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
