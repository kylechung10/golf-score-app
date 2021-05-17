import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "./Scorecard.scss";

function Scorecard(props) {
  // Game Data from GameSetup component
  const { gameData } = props;
  const [gameArray, setGameArray] = useState([]);
  const history = useHistory();

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
    <div className="score-input" key={game.holeNumber.toString()}>
      <label>Hole {game.holeNumber}</label>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={2}
        className={game.strokes !== 0 ? "completed" : undefined}
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
    const response = await Axios.patch(`/api/games/${gameData.pin}`, {
      username: gameData.username,
      gameArray: pushScore,
    });
    if (response.data) {
      Axios.patch(`/api/account/${gameData.username}`, {
        newPin: gameData.pin,
      });
      // Clear session storage on submit and also redirect the user to the game history page
      sessionStorage.removeItem("game_score");
      sessionStorage.removeItem("game_pin");
      history.push("/history");
    }
  };

  return (
    <div className="page-container">
      <div className="scorecard">
        <div className="scorecard-title">
          <span>Game PIN:</span>
          <h1>{gameData.pin}</h1>
        </div>
        <div className="scorecard-info">
          <h2>{gameData.course}</h2>
          <p>{gameData.holes}-Hole Course</p>
        </div>
        <div className="scorecard-sheet">{mapGame}</div>
        <button onClick={() => finishGame()} className="btn-main">
          Finish Game
        </button>
      </div>
    </div>
  );
}

export default Scorecard;
