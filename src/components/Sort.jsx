// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";

// import { useState, useEffect } from "react";
// import { fetchReviews, fetchReviewsByCategory } from "../utilities/api";

// export default function Sort({ filtered }) {
//   const [fetchedReviews, setFetchedReviews] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [queryParams] = useSearchParams();
//   const currCategory = queryParams.get("category");
//   const [sortType, setSortType] = useState("created_at");
//   const [sortOrder, setSortOrder] = useState("desc");

//   useEffect(() => {
//     if (filtered === false) {
//       fetchReviews(sortType, sortOrder).then((reviews) => {
//         setFetchedReviews(reviews);
//       });
//     } else if (filtered === true) {
//       if (currCategory) {
//         fetchReviewsByCategory(currCategory, sortType, sortOrder).then(
//           (reviews) => {
//             setFetchedReviews(reviews);
//           }
//         );
//       }
//     }
//   }, [sortType, sortOrder, setFetchedReviews, currCategory]);

//   const handleChange = (event) => {
//     setSortType(event.target.value);
//   };

//   const handleRadioChange = (event) => {
//     setSortOrder(event.target.value);
//   };

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="sort-drop-down">Sort By</InputLabel>
//         <Select
//           id="sort-drop-down"
//           value={sortType}
//           label="Sort By"
//           onChange={handleChange}
//         >
//           <MenuItem value={"created_at"}>Date</MenuItem>
//           <MenuItem value={"votes"}>Votes</MenuItem>
//           <MenuItem value={"comment_count"}>Comments</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl>
//         <RadioGroup row defaultValue="desc">
//           <FormControlLabel
//             value="desc"
//             control={<Radio onChange={handleRadioChange} />}
//             label="Descending"
//           />
//           <FormControlLabel
//             value="asc"
//             control={<Radio onChange={handleRadioChange} />}
//             label="Ascending"
//           />
//         </RadioGroup>
//       </FormControl>
//     </Box>
//   );
// }
