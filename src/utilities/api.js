import axios from "axios";

const diceFactorAPI = axios.create({
  baseURL: "https://dicefactor.cyclic.app/api",
});

export const fetchReviews = () => {
  return diceFactorAPI.get("/reviews").then(({ data }) => {
    return data.review;
  });
};

export const fetchReviewByID = (review_id) => {
  return diceFactorAPI.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const fetchComments = (review_id) => {
  return diceFactorAPI
    .get(`/reviews/${review_id}/comments`)
    .then(({ data }) => {
      return data.review;
    });
};

// export const patchReviewVotes = (review_id) => {
//   const patchBody = {
//     increase: 1,
//   };
//   return diceFactorAPI
//     .patch(`/comments/${comment_id}`, patchBody)
//     .then(({ data }) => {
//       console.log(data)
//       return data.comment;
//     });
// };
