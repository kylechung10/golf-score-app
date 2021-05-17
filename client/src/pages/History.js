import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import * as Dayjs from "dayjs";
import GameResults from "../components/GameResults";
import * as IoIcons from "react-icons/io";
import "./History.scss";

function History(props) {
  const username = props.username || localStorage.getItem("username");
  const [gameData, setGameData] = useState(null);
  const [detailsDisplay, setDetailsDisplay] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleUserData = async () => {
      if (username) {
        const userHistory = await Axios.get(`/api/account/${username}`);
        let gameHistory = userHistory.data.games;
        if (gameHistory.length > 0) {
          let passData = { pinArray: gameHistory };
          const arrayData = await Axios.get(`/api/player/games`, {
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
  }, [username, history]);

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
        <div
          className="game-data-child"
          key={game._id}
          onClick={() => setDetailsDisplay(game)}
        >
          <div className="game-data-info">
            <div className="game-data-top">
              <h2>{game.course}</h2>
              <h3 className="score">Score: {totalScore}</h3>
            </div>
            <div className="game-data-bottom">
              <p className="small-font">{game.date}</p>
              <p className="small-font">Players: {game.players.length}</p>
            </div>
          </div>
          <IoIcons.IoIosArrowForward className="arrow-forward" />
        </div>
      );
    });

  return (
    <div className="page-container game-history">
      {detailsDisplay ? (
        <GameResults
          detailsDisplay={detailsDisplay}
          goBack={() => setDetailsDisplay(false)}
        />
      ) : (
        <>
          <h1 className="history-header">Game History</h1>
          {gameData ? (
            <div className="game-data">{mapData()}</div>
          ) : (
            <h3>You have no previous games</h3>
          )}
        </>
      )}
    </div>
  );
}

export default History;
