import Comment from "./Comment";
import { useState, useEffect } from "react";
import { fetchComments } from "../utilities/api";

import Button from "@mui/material/Button";
import AddCommentIcon from "@mui/icons-material/AddComment";

export default function Comments({ review_id }) {
  const [fetchedComments, setFetchedComments] = useState([]);

  useEffect(() => {
    fetchComments(review_id).then((matchedComments) => {
      setFetchedComments(matchedComments);
    });
  }, [review_id]);

  return (
    <section id="comments-section">
      <header id="comments-header">
        <h1>Comments</h1>
        <Button
          size="small"
          className="comments-add-btn"
          variant="contained"
          endIcon={<AddCommentIcon />}
        >
          Add Comment
        </Button>
      </header>
      <main id="comments-block">
        <Comment fetchedComments={fetchedComments}/>
      </main>
    </section>
  );
}
