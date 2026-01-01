import { useState } from "react";

import "./styles/App.css";
import Playboard from "./components/Playboard";

// pseudocode for planning code structure
// Components: what DOM to be displayed on screen?
// Play board to display cards, Cards for player to interact with, scoreboard to keep score
// Logic: how is the game going to be played out?
// The game will be conducted in rounds
// At the start of each, the player will click on a first card, then the cards will shuffle, the score of the current round will increase by 1
// then the player get to click on the next card, if the card clicked is not one which the player has previously picked in the same round, score will incresae by 1
// otherwise, the round is done and the round score reset
// a best score will be kept, if the round score is higher than the current high score, it will replace the best score

// what state do I need?
// 1. score of current round
// 2. best score
// 3. cards that have already been picked in each round

// what effect do I need?
// 1. fetching data from API for creating the cards
// 2. displays the card in a random order after a round

function App() {
  return (
    <>
      <Playboard />
    </>
  );
}

export default App;
