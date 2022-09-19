import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Image from "../components/Image";

import "./BreedImages.css";

const BreedImages = () => {
  let { name } = useParams();

  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //fetching all the images of the breed from api
  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${name}/images`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setAllImages(response.message);
        setIsLoading(false);
      });
  }, [name]);

  return (
    <div className="breed-maincontainer">
      {isLoading ? <h1>Loading...</h1> : <h1>{name}</h1>}
      <div className="breed-images-container">
        {allImages.map((image) => (
          <Image key={image} image={image} name={name} />
        ))}
      </div>
    </div>
  );
};

export default BreedImages;
