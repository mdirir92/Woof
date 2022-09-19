import React, { useEffect, useState } from "react";
import Image from "../components/Image";

const Favourites = () => {
  const [favouriteDogs, setFavouriteDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //fetching all the favourite dogs from api
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    fetch(`/dogs/favourites/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: storedData.email,
        id: storedData._id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setFavouriteDogs(response);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <div className="breed-maincontainer">
        {isLoading ? <h1>Loading...</h1> : <h1>All Favourite Dogs</h1>}
        {favouriteDogs.length < 1 && (
          <p style={{ margin: "30px", textAlign: "center" }}>
            You have not any dogs to your favorites
          </p>
        )}
        <div className="breed-images-container">
          {favouriteDogs.length > 0 &&
            favouriteDogs.map((dog) => (
              <Image
                key={dog}
                image={dog}
                name={dog}
                hideRating={true}
                isFavouriteByUser={true}
                onUpdate={(items) => {
                  setFavouriteDogs(items);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
