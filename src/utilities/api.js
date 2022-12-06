import axios from "axios";

const diceFactorAPI = axios.create({
  baseURL: "https://dicefactor.cyclic.app/api",
});

export const fetchReviews = () => {
  return diceFactorAPI.get("/reviews").then(({ data }) => {
    return data.review;
  });
};

