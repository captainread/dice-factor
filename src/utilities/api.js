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

