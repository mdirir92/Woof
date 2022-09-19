import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BreedItem from "../components/BreedItem";
import "./Home.css";

function Home() {
  const [allDogBreeds, setAllDogBreeds] = useState([]);
  const navigate = useNavigate();

  //fetching all the dogs breed from api
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setAllDogBreeds(response.message);
      });
  }, []);

  return (
    <div className="home">
      <h1>Select any breed to show its images</h1>
      <div className="breed-list-container">
        {/* populating the breed to show them */}
        {allDogBreeds.map((breed) => (
          <BreedItem
            key={breed}
            onClick={() => {
              navigate(`/breed/${breed}`);
            }}
            name={breed}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
