import { useState, useEffect } from "react";
import "../styles/Playboard.css";

const API_URL = "https://dragonball-api.com/api/characters?limit=10000";

export default function Playboard() {
  // state declaration
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pickedCardsId, setPickedCardsId] = useState([]);
  const [imagesData, setImagesData] = useState([]);

  const numberOfCards = 12;
  //effect to retrieve images and image info from API, dependency left empty since this should be an one time action
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.items.filter((item, index) => index < numberOfCards));
        setImagesData(
          shuffleImgDataArr(
            data.items.filter((item, index) => index < numberOfCards)
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  function handleClick(e) {
    const cardPicked = e.currentTarget;
    //when a card is clicked, the logic should first find out whether it is a card in the "picked cards" state variable:
    //case 1: if it is not -> 1. add 1 point to current score 2. add the card to the "picked cards state variable" 3. shuffle cards on display 4. check whether the current score equals the best score, if it does, replace it; otherwise do nothing
    //case 2: if it is -> 1. check whether current score is best score, if it is, update best score 2. shuffle the cards again for new game 3. reset the picked cards and current score state variables
    if (!pickedCardsId.includes(cardPicked.id)) {
      setCurrentScore(currentScore + 1);
      setPickedCardsId(pickedCardsId.concat(cardPicked.id));
      if (currentScore + 1 > bestScore) {
        setBestScore(currentScore + 1);
      }
      checkIfWin();
      //shuffle images
      setImagesData(shuffleImgDataArr(imagesData));
    } else {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setImagesData(shuffleImgDataArr(imagesData));
      setCurrentScore(0);
      setPickedCardsId([]);
    }
  }

  function shuffleImgDataArr(array) {
    let arrayCopy = array;
    let currentIndex = arrayCopy.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
        arrayCopy[randomIndex],
        arrayCopy[currentIndex],
      ];
    }
    return arrayCopy;
  }

  function checkIfWin() {
    if (currentScore + 1 === numberOfCards) {
      alert("Congratulation! You won deez dragon balls");
      setImagesData(shuffleImgDataArr(imagesData));
      setCurrentScore(0);
      setPickedCardsId([]);
    }
  }

  return (
    <>
      <PageTitle />
      <Scoreboard current={currentScore} best={bestScore} />
      {imagesData.map((data) => (
        <Cards
          cardId={data.id}
          //adding a key to the Card component stops flickering images after shuffling, the key helps react to change only what has been changed
          key={data.id}
          cardImg={data.image}
          cardName={data.name}
          handleClick={(e) => handleClick(e)}
        />
      ))}
    </>
  );
}

function Cards({ cardImg, cardName, cardId, handleClick }) {
  return (
    <>
      <div className="card" onClick={handleClick} id={cardId}>
        <img src={cardImg}></img>
        <h3>{cardName}</h3>
      </div>
    </>
  );
}

function Scoreboard({ current, best }) {
  return (
    <>
      <div className="scoreboard">
        <h2 className="current-score">Current Score:{current}</h2>
        <h2 className="best-score">Best Score:{best}</h2>
      </div>
    </>
  );
}

function PageTitle() {
  return <h1>Dragon Deez Balls In Yo Face Memory Card</h1>;
}
