import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { fetchCategories } from "../utilities/api";
import { formatCat } from "../utilities/util";

export default function Categories() {
  const [fetchedCats, setFetchedCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchCategories()
      .then((cats) => {
        setFetchedCats(cats);
        setIsLoading(false);
      })
  }, []);

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
                <Button value={category.slug} variant="contained">
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
