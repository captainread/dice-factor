import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ReviewCard({ fetchedReviews }) {

  return fetchedReviews.map((review, index) => {
    return (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <Item className="review-card">
          <h3>{review.title}</h3>
          <p>{review.owner}</p>
          <img src={review.review_img_url} />
          <p>
            {review.review_body.replace(/(.{80})..+/, "$1...")}
          </p>
          <Link to={`/api/reviews/${review.review_id}`}>
            <Button
              className="read-more"
              variant="contained"
              endIcon={<ReadMoreIcon />}
            >
              Read More
            </Button>
          </Link>
        </Item>
      </Grid>
    );
  });
}
