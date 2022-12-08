import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  fetchReviewByID,
  patchReviewVotesUp,
  patchReviewVotesDown,
} from "../utilities/api";
import Comments from "./Comments";

import { Paper, Chip, Stack, Avatar, IconButton, Alert } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import CategoryIcon from "@mui/icons-material/Category";
import BrushIcon from "@mui/icons-material/Brush";
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
  const { review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedReview, setFetchedReview] = useState({});
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState(false);
  const [disableUpvote, setDisableUpvote] = useState(false);
  // const [disableDownvote, setDisableDownvote] = useState(false);
  const [voteClicked, setVoteClicked] = useState("");

  useEffect(() => {
    fetchReviewByID(review_id).then((matchedReview) => {
      setFetchedReview(matchedReview);
      setVotes(matchedReview.votes);
      setIsLoading(false);
    });
  }, [review_id, fetchedReview.votes]);

  useEffect(() => {}, [error]);

  const handleUpvote = (e) => {
    e.preventDefault();
    setVoteClicked("upvote");
    setVotes((currentVotes) => {
      if (voteClicked === "") {
        setVoteClicked("upvote");
        // setDisableUpvote(true);
        return currentVotes + 1;
      } else if (voteClicked === "upvote") {
        setVoteClicked("");
        // setDisableUpvote(false);
        return currentVotes - 1;
      }
    });
    patchReviewVotesUp(review_id)
      .then(() => {
        setError(false);
      })
      .catch((error) => {
        setVoteClicked("");
        setError(true);
        setVotes((currentVotes) => {
          return currentVotes - 1;
        });
      });
  };

  const handleDownvote = (e) => {
    e.preventDefault();
    setVoteClicked("downvote");
    setVotes((currentVotes) => {
      if (voteClicked === "") {
        setVoteClicked("downvote");
        // setDisableDownvote(true);
        return currentVotes - 1;
      }
      if (voteClicked === "downvote") {
        setVoteClicked("");
        // setDisableDownvote(false);
        return currentVotes + 1;
      }
    });
    patchReviewVotesDown(review_id)
      .then(() => {
        setError(false);
      })
      .catch((error) => {
        // setDisableDownvote(false);
        setVoteClicked("");
        setError(true);
        setVotes((currentVotes) => {
          return currentVotes + 1;
        });
      });
  };

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
          <Chip
            id="review-details-owner"
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
          <h4 className="votes-header">Votes: {votes}</h4>
          <div className="votes-btns">
            <IconButton
              id="upvote"
              onClick={(e) => handleUpvote(e)}
              // disabled={disableUpvote}
            >
              <ThumbUpIcon />
            </IconButton>
            <IconButton
              id="downvote"
              onClick={(e) => handleDownvote(e)}
              // disabled={disableDownvote}
            >
              <ThumbDownIcon />
            </IconButton>
          </div>
        </main>
        {error ? (
          <Alert severity="error">Vote failed, please try again. </Alert>
        ) : null}
      </Item>
      <Comments review_id={review_id} />
    </article>
  );
}
