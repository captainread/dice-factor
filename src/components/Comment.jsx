import * as React from "react";
import { useContext } from "react";

import { UserContext } from "../utilities/contexts";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Chip } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function Comment({ fetchedComments, handleVote }) {
  const { user } = useContext(UserContext);

  return (
    <main>
      {fetchedComments.length === 0
        ? "Be the first to leave a comment."
        : fetchedComments.map((comment, index) => {
            return (
              <Box key={index} sx={{ width: "100%" }}>
                <Stack spacing={2}>
                  <Item className="comments-card">
                    <Chip
                      avatar={<Avatar src="/broken-image.jpg" />}
                      label={comment.author}
                    />
                    {user.username === comment.author ? (
                      <Button
                        size="small"
                        className="comments-add-btn"
                        variant="outlined"
                        endIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    ) : null}
                    <p>{comment.body}</p>
                    <h4 className="votes-header">Votes: {comment.votes}</h4>
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
