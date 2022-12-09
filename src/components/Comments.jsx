import * as React from "react";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { fetchComments, postComment } from "../utilities/api";
import { useContext, useEffect, useState } from "react";

import AddCommentIcon from "@mui/icons-material/AddComment";
import Comment from "./Comment";
import { UserContext } from "../utilities/contexts";

export default function Comments({ review_id }) {
  const { user } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [newComment, setNewComment] = useState({
    body: "",
  });

  useEffect(() => {
    fetchComments(review_id).then((matchedComments) => {
      setFetchedComments(matchedComments);
    });
  }, [review_id, newComment]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    postComment(review_id, newComment.body, user.username)
      .then((commentFromAPI) => {
        setNewComment("");
        setCommentSuccess(true);
        setError(false);
        setFetchedComments((currComments) => {
          const newComments = [...currComments];
          newComments.push(commentFromAPI);
          return newComments;
        });
      })
      .catch(() => {
        setError(true);
        setCommentSuccess(false);
      });
  };

  return (
    <section id="comments-section">
      <header id="comments-header">
        <h1>Comments</h1>
        <Button
          onClick={handleClickOpen}
          className="comments-add-btn"
          variant="contained"
          endIcon={<AddCommentIcon />}
        >
          Add
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Your Comment</DialogTitle>
          {user.username ? (
            <>
              <DialogContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "fit-content" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-required"
                      label="Required"
                      placeholder="Please enter text"
                      style={{ width: 200, minHeight: 50 }}
                      onChange={(event) => {
                        setNewComment((currComment) => {
                          const newComment = { ...currComment };
                          newComment.body = event.target.value;
                          return newComment;
                        });
                      }}
                    />
                  </div>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </DialogActions>
            </>
          ) : (
            <>
              <DialogContent>
                You are not signed in. Please sign in to add a comment.
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </header>
      <main id="comments-block">
        {error ? (
          <Alert id="hideMeAfter5Seconds" severity="error">
            Your comment failed to post. Please try again.{" "}
          </Alert>
        ) : null}
        {commentSuccess ? (
          <Alert id="hideMeAfter5Seconds" severity="success">
            {" "}
            Your comment has been posted.
          </Alert>
        ) : null}
        <Comment
          fetchedComments={fetchedComments}
          setFetchedComments={setFetchedComments}
        />
      </main>
    </section>
  );
}
