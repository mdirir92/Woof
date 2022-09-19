import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Rating,
  Select,
  MenuItem,
} from "@mui/material";

const RatedDogs = () => {
  const [allRatedDogs, setAllRatedDogs] = useState([]);
  const [filterValue, setFilterValue] = useState("none");
  const [isLoading, setIsLoading] = useState(true);

  //fetch all rated dogs
  useEffect(() => {
    fetch(
      `/dogs/rated/all${
        filterValue !== "none" ? `?filter=${filterValue}` : "/"
      }`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setAllRatedDogs(response);
        setIsLoading(false);
      });
  }, [filterValue]);

  const handleChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div>
      <div className="breed-maincontainer">
        <div className="filter-ctn">
          {isLoading ? <h1>Loading...</h1> : <h1>All Rated Dogs</h1>}
          {!isLoading && (
            <FormControl>
              <InputLabel id="filter">Filter By</InputLabel>
              <Select
                size="small"
                labelId="filter"
                id="filter"
                value={filterValue}
                label="Filter By"
                onChange={handleChange}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="highest_rating">Highest Rating</MenuItem>
                <MenuItem value="lowest_rating">Lowest Rating</MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
        {allRatedDogs.length < 1 && (
          <p style={{ margin: "30px", textAlign: "center" }}>
            No Rated Dogs Found!
          </p>
        )}
        <div className="breed-images-container">
          {allRatedDogs.length > 0 &&
            allRatedDogs.map((dog) => (
              <div key={dog.id}>
                <img src={dog.url} alt={dog.id} className="breed-image" />
                <div>
                  <Rating
                    name="rating"
                    value={dog.rating}
                    precision={0.5}
                    readOnly
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RatedDogs;
