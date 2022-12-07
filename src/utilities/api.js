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

export const patchReviewVotesUp = (review_id) => {
  const patchBody = {
    inc_votes: +1,
  };

  return diceFactorAPI
    .patch(`/reviews/${review_id}`, patchBody)
    .then(({ data }) => {
      return data.review;
    });
};

export const patchReviewVotesDown = (review_id) => {
  const patchBody = {
    inc_votes: -1,
  };

  return diceFactorAPI
    .patch(`/reviews/${review_id}`, patchBody)
    .then(({ data }) => {
      return data.review;
    });
};
