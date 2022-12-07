import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchReviewByID } from "../utilities/api";

import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CategoryIcon from "@mui/icons-material/Category";
import BrushIcon from "@mui/icons-material/Brush";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ReviewDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedReview, setFetchedReview] = useState({});
  const { review_id } = useParams();

  useEffect(() => {
    fetchReviewByID(review_id).then((matchedReview) => {
      setFetchedReview(matchedReview);
      setIsLoading(false);
    });
  }, [review_id]);

  if (isLoading) {
    return (
      <main className="loading-wrap">
        <span className="loading">Loading...</span>
      </main>
    );
  }
  console.log(fetchedReview);
  return (
    <article id="review-details-page">
      <Item>
        <header id="review-details-header">
          <h1>{fetchedReview.title}</h1>
          <h2>@{fetchedReview.owner}</h2>
          <h3>{fetchedReview.created_at.slice(0, 10)}</h3>
        </header>
        <main id="review-details-body">
          <img src={fetchedReview.review_img_url} />
          <div id="review-details-game">
            <Stack direction="row" spacing={2}>
              <Chip
                icon={<CategoryIcon />}
                label={`Category: ${fetchedReview.category}`}
              />
              <Chip
                icon={<BrushIcon />}
                label={`Designer: ${fetchedReview.designer}`}
              />
            </Stack>
          </div>
          <p>{fetchedReview.review_body}</p>
        </main>
      </Item>
    </article>
  );
}
