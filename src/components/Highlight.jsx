import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function Highlight() {
  return (
    <section id="highlight">
      <h1>
        Scythe:
        <br />
        you're gonna need a bigger table.
      </h1>
      <div id="hightlight-btn-div">
        <Link to={`/api/reviews/8`}>
          <Button
            className="read-more"
            variant="contained"
            endIcon={<ReadMoreIcon />}
          >
            Read More
          </Button>
        </Link>
      </div>
    </section>
  );
}
