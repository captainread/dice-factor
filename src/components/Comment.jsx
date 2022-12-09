import * as React from "react";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Stack,
} from "@mui/material";
import { useContext, useState } from "react";

import Avatar from "@mui/material/Avatar";
import { Chip } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { UserContext } from "../utilities/contexts";
import { deleteComment } from "../utilities/api";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function Comment({ fetchedComments, setFetchedComments }) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleClickOpen = (comment_id) => {
    setOpen(true);
    setCommentToDelete(comment_id);
  };

  const handleClose = () => {
    setOpen(false);
    setCommentToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    deleteComment(commentToDelete)
      .then(() => {
        setError(false);
        setDeleteSuccess(true);
        setFetchedComments((currComments) => {
          const newComments = [...currComments];
          newComments.shift();
          return newComments;
        });
      })
      .catch(() => {
        setError(true);
        setDeleteSuccess(false);
      });
  };

  return (
    <main>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Comment?</DialogTitle>
        <DialogActions>
          <Button onClick={handleSubmit}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>

      {error ? (
        <Alert id="hideMeAfter5Seconds" severity="error">
          Failed to delete comment. Please try again.{" "}
        </Alert>
      ) : null}
      
      {deleteSuccess ? (
        <Alert id="hideMeAfter5Seconds" severity="warning">
          {" "}
          Comment deleted.
        </Alert>
      ) : null}

      {fetchedComments.length === 0
        ? "Be the first to leave a comment."
        : fetchedComments.map(({ body, author, comment_id, votes }, index) => {
            return (
              <Box key={index} sx={{ width: "100%" }}>
                <Stack spacing={2}>
                  <Item className="comments-card">
                    <Chip
                      avatar={<Avatar src="/broken-image.jpg" />}
                      label={author}
                    />

                    {user.username === author ? (
                      <Button
                        onClick={() => handleClickOpen(comment_id)}
                        size="small"
                        className="comments-add-btn"
                        variant="outlined"
                        endIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    ) : null}

                    <p>{body}</p>
                    <h4 className="votes-header">Votes: {votes}</h4>
                    <div className="votes-btns">
                      <IconButton aria-label="upvote">
                        <ThumbUpIcon />
                      </IconButton>
                      <IconButton aria-label="downvote">
                        <ThumbDownIcon />
                      </IconButton>
                    </div>
                  </Item>
                </Stack>
              </Box>
            );
          })}
    </main>
  );
}
