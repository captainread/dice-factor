import { Alert, Avatar, Chip, IconButton, Paper, Stack } from "@mui/material";
import {
  fetchReviewByID,
  patchReviewVotesDown,
  patchReviewVotesUp,
} from "../../utilities/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BrushIcon from "@mui/icons-material/Brush";
import CategoryIcon from "@mui/icons-material/Category";
import Comments from "../Comments";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { experimentalStyled as styled } from "@mui/material/styles";

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
  const [voteClicked, setVoteClicked] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviewByID(review_id)
      .then((matchedReview) => {
        setFetchedReview(matchedReview);
        setVotes(matchedReview.votes);
        setIsLoading(false);
      })
      .catch(() => {
        navigate("/error");
      });
  }, [review_id, fetchedReview.votes, navigate]);

  useEffect(() => {}, [error]);

  const handleUpvote = (e) => {
    e.preventDefault();
    setVoteClicked("upvote");
    setVotes((currentVotes) => {
      if (voteClicked === "") {
        setVoteClicked("upvote");
        return currentVotes + 1;
      }
      if (voteClicked === "downvote") {
        setVoteClicked("upvote");
        return currentVotes + 2;
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
        return currentVotes - 1;
      }
      if (voteClicked === "upvote") {
        setVoteClicked("downvote");
        return currentVotes - 2;
      }
      if (voteClicked === "downvote") {
        setVoteClicked("");
        return currentVotes + 1;
      }
    });
    patchReviewVotesDown(review_id)
      .then(() => {
        setError(false);
      })
      .catch((error) => {
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
              color={voteClicked === "upvote" ? "success" : ""}
            >
              <ThumbUpIcon />
            </IconButton>
            <IconButton
              id="downvote"
              onClick={(e) => handleDownvote(e)}
              color={voteClicked === "downvote" ? "error" : ""}
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
