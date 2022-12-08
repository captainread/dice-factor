import axios from "axios";

const diceFactorAPI = axios.create({
  baseURL: "https://dicefactor.cyclic.app/api",
});

export const fetchReviews = () => {
  return diceFactorAPI.get(`/reviews`).then(({ data }) => {
    return data.review;
  });
};

export const fetchReviewByID = (review_id) => {
  return diceFactorAPI.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const fetchReviewsByCategory = (category) => {
  return diceFactorAPI.get(`/reviews?category=${category}`).then(({ data }) => {
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

export const postComment = (review_id, body, username) => {
  const postBody = {
    username: `${username}`,
    body: `${body}`,
  };

  return diceFactorAPI
    .post(`/reviews/${review_id}/comments`, postBody)
    .then(({ data }) => {
      return data;
    });
};

export const fetchCategories = () => {
  return diceFactorAPI.get(`/categories`).then(({ data }) => {
    return data.category;
  });
};
