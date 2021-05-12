import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import * as Dayjs from "dayjs";
import GameResults from "../components/GameResults";

function History(props) {
  const { username } = props;
  const apiURL = process.env.apiURL || "http://localhost:5000";
  const [gameData, setGameData] = useState(null);
  const [detailsDisplay, setDetailsDisplay] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleUserData = async () => {
      if (username) {
        const userHistory = await Axios.get(
          `${apiURL}/api/account/${username}`
        );
        let gameHistory = userHistory.data.games;
        if (gameHistory.length > 0) {
          let passData = { pinArray: gameHistory };
          const arrayData = await Axios.get(`${apiURL}/api/player/games`, {
            params: passData,
          });
          setGameData(arrayData.data.games);
        }
      } else {
        // If user is not logged in, reddirect to the home page
        history.push("/");
      }
    };
    handleUserData();
  }, [username, apiURL, history]);

  const mapData = () =>
    gameData.map((game) => {
      // Find the score matching the user logged in
      const currentPlayer = game.players.find((name) => {
        return name.username === username;
      });
      // Calculate the total score of current game
      const totalScore = currentPlayer.gameArray.reduce((a, b) => a + b, 0);
      game.date = Dayjs(game.date).format("MMM DD, YYYY");
      return (
        <div className="game-data" key={game._id}>
          <h3>{game.date}</h3>
          <h4>Your Total Score: {totalScore}</h4>
          <p>Course: {game.course}</p>
          <p>Players: {game.players.length}</p>
          <button onClick={() => setDetailsDisplay(game)}>Details</button>
        </div>
      );
    });

  return (
    <div className="page-container">
      <h1>Game History</h1>
      {detailsDisplay ? (
        <GameResults
          detailsDisplay={detailsDisplay}
          goBack={() => setDetailsDisplay(false)}
        />
      ) : gameData ? (
        mapData()
      ) : undefined}
    </div>
  );
}

export default History;
