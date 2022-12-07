import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchReviewByID } from "../utilities/api";
import Comments from "./Comments";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CategoryIcon from "@mui/icons-material/Category";
import BrushIcon from "@mui/icons-material/Brush";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

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

  function handleVote(review_id, comment_id) {
    // patchComment(comment_id).then((updatedComment) => {
    //   setFetchedComments((currComments) => {
    //     return currComments.map((comment) => {
    //       if (comment.comment_id === updatedComment.comment_id) {
    //         return { ...comment, votes: comment.votes + 1 };
    //       }
    //       return comment;
    //     });
    //   });
    // });
  }

  if (isLoading) {
    return (
      <main className="loading-wrap">
        <span className="loading">Loading...</span>
      </main>
    );
  }

  return (
    <article id="review-details-page">
      <Item>
        <header id="review-details-header">
          <h1>{fetchedReview.title}</h1>
          <Chip id="review-details-owner"
            avatar={<Avatar src="/broken-image.jpg" />}
            label={fetchedReview.owner}
          />
          <h3>{fetchedReview.created_at.slice(0, 10)}</h3>
        </header>
        <main id="review-details-body">
          <img src={fetchedReview.review_img_url} alt={fetchedReview.title} />
          <div id="review-details-game">
            <Stack direction="row" spacing={2}>
              <Chip
                icon={<CategoryIcon />}
                label={`${fetchedReview.category}`}
              />
              <Chip icon={<BrushIcon />} label={`${fetchedReview.designer}`} />
            </Stack>
          </div>
          <p>{fetchedReview.review_body}</p>
          <h4 className="votes-header">Votes: {fetchedReview.votes}</h4>
          <div className="votes-btns">
            <IconButton aria-label="upvote" onClick={handleVote}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton aria-label="downvote" onClick={() => handleVote()}>
              <ThumbDownIcon />
            </IconButton>
          </div>
        </main>
      </Item>
      <Comments review_id={review_id} />
    </article>
  );
}
