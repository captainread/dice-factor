import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchCategories } from "../utilities/api";
import Reviews from "./Reviews";
import { formatCat } from "../utilities/util";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Categories() {
  const [fetchedCats, setFetchedCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((cats) => {
      setFetchedCats(cats);
      setIsLoading(false);
    });
  }, []);

  const handleClick = (e) => {
    const cat = e.target.value;
  };

  if (isLoading) {
    return (
      <main className="loading-wrap">
        <span className="loading">Loading...</span>
      </main>
    );
  }

  return (
    <Box id="all-page" sx={{ width: "100%" }}>
      <header id="categories-header">
        <h2>All Categories</h2>
        <p>
          You can filter to reviews for specific game categories using the links
          below.
        </p>
      </header>
      <main>
        <Stack
          spacing={2}
          sx={{ width: "auto", maxWidth: "50%", margin: "auto" }}
        >
          {fetchedCats.map((category, index) => {
            return (
              <Link key={index} to={`/reviews?category=${category.slug}`}>
                <Button
                  value={category.slug}
                  onClick={handleClick}
                  variant="contained"
                >
                  {formatCat(category.slug)}
                </Button>
              </Link>
            );
          })}
        </Stack>
      </main>
    </Box>
  );
}
