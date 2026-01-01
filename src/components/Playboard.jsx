import { useState, useEffect } from "react";

const API_URL = "https://dragonball-api.com/api/characters?limit=10000";

export default function Playboard() {
  // state declaration
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(null);
  const [pickedCards, setpickedCards] = useState([]);
  const [imagesData, setImagesData] = useState([]);

  const numberOfCards = 12;
  //effect to retrieve images and image info from API, dependency left empty since this should be an one time action
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.items.filter((item, index) => index < numberOfCards));
        setImagesData(data.items.map((item, index) => index < numberOfCards));
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return <></>;
}

function Cards() {
  return (
    <>
      <div className="card" imgSrc={imgSrc} imgName={imgName}>
        <img></img>
        <h3></h3>
      </div>
    </>
  );
}

function Scoreboard() {}
