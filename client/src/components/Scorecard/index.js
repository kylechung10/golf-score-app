import React, { useState, useEffect } from "react";
import Axios from "axios";
import GameResults from "../GameResults";

function Scorecard(props) {
  // Game Data from GameSetup component
  const { gameData } = props;
  const [gameArray, setGameArray] = useState([]);
  const [submitGame, setSubmitGame] = useState(false);

  useEffect(() => {
    const sessionGame = () => {
      // If rejoining an unfinished game, display the saved values
      if (sessionStorage.getItem("game_pin") === gameData.pin) {
        setGameArray(JSON.parse(sessionStorage.getItem("game_score")));
      } else {
        // Create a new game array if game pins do not match
        let newArray = [];
        for (let i = 0; i < gameData.holes; i++) {
          newArray.push({
            holeNumber: i + 1,
            strokes: 0,
          });
        }
        setGameArray(newArray);
        // Save new game array and new game pin to session storage
        sessionStorage.setItem("game_score", JSON.stringify(newArray));
        sessionStorage.setItem("game_pin", gameData.pin);
      }
    };
    sessionGame();
  }, [gameData.pin, gameData.holes]);

  // Map out the inputs for every hole based on the game array
  const mapGame = gameArray.map((game) => (
    <div className="hole-input" key={game.holeNumber.toString()}>
      <h3>Hole {game.holeNumber}</h3>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={2}
        value={game.strokes !== 0 ? game.strokes : ""}
        onFocus={(e) => e.target.select()}
        onChange={(e) => updateScore(+e.target.value, game.holeNumber)}
      />
    </div>
  ));

  // Update the score on change to session storage and useState
  const updateScore = (strokes, currentHole) => {
    if (Number.isInteger(strokes)) {
      // Match the updating input with the array
      let findH = gameArray.find(
        ({ holeNumber }) => holeNumber === currentHole
      );
      let newData = [...gameArray];
      findH.strokes = strokes;
      setGameArray(newData);
      sessionStorage.setItem("game_score", JSON.stringify(newData));
    }
  };

  // Finish game and submit score to the database
  const finishGame = async () => {
    let pushScore = [];
    // Only send # of strokes to the database
    for (let score of gameArray) {
      pushScore.push(score.strokes);
    }
    const apiURL = process.env.apiURL || "http://localhost:5000";
    const response = await Axios.patch(`${apiURL}/api/games/${gameData.pin}`, {
      username: gameData.username,
      gameArray: pushScore,
    });
    if (response.data) {
      setSubmitGame(true);
      Axios.patch(`${apiURL}/api/account/${gameData.username}`, {
        newPin: gameData.pin,
      });
      sessionStorage.removeItem("game_score");
      sessionStorage.removeItem("game_pin");
    }
  };

  return !submitGame ? (
    <div className="scorecard">
      <h2>Scorecard</h2>
      <p>{gameData.pin}</p>
      <p>{gameData.course}</p>
      {mapGame}
      <button onClick={() => finishGame()}>Finish Game</button>
    </div>
  ) : (
    <GameResults gameData={gameData} />
  );
}

export default Scorecard;
