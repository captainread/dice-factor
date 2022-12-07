import * as React from "react";
import { useState, useEffect, useContext } from "react";

import Comment from "./Comment";
import { fetchComments, postComment } from "../utilities/api";
import { UserContext } from "../utilities/contexts";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Box from "@mui/material/Box";

export default function Comments({ review_id }) {
  const { user } = useContext(UserContext);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [newComment, setNewComment] = useState({
    body: "",
  });
  const [commentSubmission, setCommentSubmission] = useState(false);

  useEffect(() => {
    fetchComments(review_id).then((matchedComments) => {
      setFetchedComments(matchedComments);
    });
  }, [review_id]);

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
    setCommentSubmission(true);
    postComment(review_id, newComment.body, user.username);
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
                  required
                  id="outlined-required"
                  label="Required"
                  placeholder="Please enter text"
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
        </Dialog>
      </header>
      <main id="comments-block">
        <Comment fetchedComments={fetchedComments} />
      </main>
    </section>
  );
}
