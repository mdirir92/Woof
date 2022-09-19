import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import { ReactComponent as HeartIcon } from "../assets/heart.svg";
import { ReactComponent as HeartFillIcon } from "../assets/heart-fill.svg";

import "./RandomDogs.css";

const RandomDogs = () => {
  const [randomImage, setRandomImage] = useState();
  const [rating, setRating] = useState(0);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedDogBreed, setSelectedDogBreed] = useState("Select a Breed");

  const [isFetching, setIsFetching] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  //function to set as favourite and remove from favourite
  const handleFavourite = async () => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    console.log(randomImage);
    if (isFavourite) {
      const response = await fetch(`/dogs/favourites/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: randomImage,
          email: storedData.email,
          id: storedData._id,
        }),
      });

      const data = await response.json();
      console.log(data);
      setIsFavourite(false);
      toast.success("Removed from favourites!");
    } else {
      const response = await fetch(`/dogs/favourites/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: randomImage,
          email: storedData.email,
          id: storedData._id,
        }),
      });
      const data = await response.json();
      console.log(data);
      setIsFavourite(true);
      toast.success("Added to favourites!");
    }
  };

  //function to change rating
  const changeRatingHandler = (event, newValue) => {
    setRating(newValue);
  };

  //fetching the dog breeds
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setDogBreeds(response.message);
      });
  }, []);

  //fetching the random image
  useEffect(() => {
    setIsFavourite(false);
    setIsLoading(false);
    setIsLoading(true);
    if (selectedDogBreed !== "Select a Breed") {
      fetch(`https://dog.ceo/api/breed/${selectedDogBreed}/images/random`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setRandomImage(response.message);
          setIsLoading(false);
        });
    } else {
      fetch(`https://dog.ceo/api/breeds/image/random`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setRandomImage(response.message);
          setIsLoading(false);
        });
    }
  }, [isFetching, selectedDogBreed]);

  //fetching again when fetch button is clicked
  const fetchAgainHandler = () => {
    setIsFetching((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setSelectedDogBreed(event.target.value);
  };

  //function to rate the image
  const submitRatingHandler = async () => {
    const response = await fetch(`/dogs/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: randomImage,
        rating: rating,
      }),
    });
    const responseData = await response.json();
    if (responseData.message === "The dog was rated successfully") {
      setIsRated(true);
      toast.success("The dog was rated successfully!");
    }
    console.log(responseData);
  };

  return (
    <div className="random-mainContainer">
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && (
        <div className="ctn">
          <h1>
            Random Dog Image{" "}
            {selectedDogBreed !== "Select a Breed" && `of ${selectedDogBreed}`}
          </h1>
          <div className="random-image-container">
            <img src={randomImage} alt="random-dog" className="random-image" />
            <div className="rating-ctn">
              <Typography component="legend">Give rating</Typography>
              <Rating
                name="rating"
                value={rating}
                readOnly={isRated}
                onChange={changeRatingHandler}
              />
              <div style={{ margin: "10px" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={submitRatingHandler}
                >
                  Submit Rating
                </Button>
              </div>
            </div>
            <div className="heart-icon" onClick={handleFavourite}>
              {!isFavourite && <HeartIcon width={30} height={30} />}
              {isFavourite && <HeartFillIcon width={30} height={30} />}
            </div>
          </div>
          <div className="actions-container">
            <FormControl fullWidth sx={{ flex: 2 }}>
              <InputLabel id="breed">Breed</InputLabel>
              <Select
                labelId="breed"
                id="breed"
                value={selectedDogBreed}
                label="Breed"
                onChange={handleChange}
              >
                <MenuItem value="Select a Breed">Select a Breed</MenuItem>
                {dogBreeds.map((breed) => (
                  <MenuItem key={breed} value={breed}>
                    {breed}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              sx={{ flex: 1 }}
              variant="contained"
              onClick={fetchAgainHandler}
            >
              Fetch a New Random Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomDogs;
