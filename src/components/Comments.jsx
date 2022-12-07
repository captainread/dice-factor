import Comment from "./Comment";
import { useState, useEffect } from "react";
import { fetchComments } from "../utilities/api";

export default function Comments({ review_id }) {
  const [fetchedComments, setFetchedComments] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments(review_id).then((matchedComments) => {
      setFetchedComments(matchedComments);
      //   setIsLoading(false)
    });
  }, [review_id]);

  //   if (isLoading) {
  //     return (
  //       <main className="loading-wrap">
  //         <span className="loading">Loading...</span>
  //       </main>
  //     );
  //   }

  return (
    <section>
      <h1>Comments</h1>
      <Comment fetchedComments={fetchedComments} />
    </section>
  );
}
