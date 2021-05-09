import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as Dayjs from "dayjs";
import GameResults from "../components/GameResults";

function History(props) {
  const username = props.username || localStorage.getItem("username");
  const apiURL = process.env.apiURL || "http://localhost:5000";
  const [gameData, setGameData] = useState(null);
  const [detailsDisplay, setDetailsDisplay] = useState(null);

  useEffect(() => {
    const handleUserData = async () => {
      const userHistory = await Axios.get(`${apiURL}/api/account/${username}`);
      let gameHistory = userHistory.data.games;
      if (gameHistory.length > 0) {
        let passData = { pinArray: gameHistory };
        const arrayData = await Axios.get(`${apiURL}/api/player/games`, {
          params: passData,
        });
        setGameData(arrayData.data.games);
        console.log("Run?");
      }
    };
    handleUserData();
  }, [username, apiURL]);
  // });

  const mapData = () =>
    gameData.map((game) => {
      // Find the score matching the user logged in
      const currentPlayer = game.players.find((name) => {
        return name.username === username;
      });
      // Calculate the total score of current game
      const totalScore = currentPlayer.gameArray.reduce((a, b) => a + b, 0);
      return (
        <div className="game-data" key={game._id}>
          <h3>{Dayjs(game.date).format("MMM DD, YYYY")}</h3>
          <h4>Your Total Score: {totalScore}</h4>
          <p>Course: {game.course}</p>
          <p>Players: {game.players.length}</p>
          <button onClick={() => setDetailsDisplay(game)}>Details</button>
        </div>
      );
    });

  return (
    <section className="page-history">
      <h1>Game History</h1>
      {detailsDisplay ? (
        <GameResults detailsDisplay={detailsDisplay} />
      ) : gameData ? (
        mapData()
      ) : undefined}
    </section>
  );
}

export default History;
