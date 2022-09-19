import React, { useState } from "react";
import { Button, Rating, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { ReactComponent as HeartIcon } from "../assets/heart.svg";
import { ReactComponent as HeartFillIcon } from "../assets/heart-fill.svg";

import "./Image.css";

const Image = ({
  image,
  name,
  hideRating = false,
  isFavouriteByUser = false,
  onUpdate = () => {},
}) => {
  const [isFavourite, setIsFavourite] = useState(isFavouriteByUser);
  const [isRated, setIsRated] = useState(false);
  const [rating, setRating] = useState(0);

  //function to set as favourite and remove from favourite
  const handleFavourite = async () => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    console.log(image);
    if (isFavourite) {
      const response = await fetch(`/dogs/favourites/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: image,
          email: storedData.email,
          id: storedData._id,
        }),
      });

      const data = await response.json();
      console.log(data);
      onUpdate(data);
      setIsFavourite(false);
      toast.success("Removed from favourites!");
    } else {
      const response = await fetch(`/dogs/favourites/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: image,
          email: storedData.email,
          id: storedData._id,
        }),
      });
      const data = await response.json();
      console.log(data);
      onUpdate(data);
      setIsFavourite(true);
      toast.success("Added to favourites!");
    }
  };

  const changeRatingHandler = (event, newValue) => {
    setRating(newValue);
    console.log(newValue);
  };

  //function to rate the image
  const submitRatingHandler = async () => {
    const response = await fetch(`/dogs/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: image,
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
    <div className="img-ctn">
      <img src={image} alt={name} className="breed-image" />
      {!hideRating && (
        <div className="rating-ctn">
          <Typography component="legend">Give rating</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={changeRatingHandler}
            readOnly={isRated}
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
      )}
      <div className="heart-icon" onClick={handleFavourite}>
        {!isFavourite && <HeartIcon width={30} height={30} />}
        {isFavourite && <HeartFillIcon width={30} height={30} />}
      </div>
    </div>
  );
};

export default Image;
