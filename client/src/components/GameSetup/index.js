import React, { useState, useEffect } from "react";
import Axios from "axios";
import Scorecard from "../Scorecard";

function GameSetup(props) {
  const apiURL = process.env.apiURL || "http://localhost:5000";
  const [showJoin, setShowJoin] = useState(true);
  const [gameData, setGameData] = useState(null);
  const { username } = props;

  const handleGameData = (gameData) => {
    setGameData({
      username: username,
      pin: gameData.pin,
      holes: gameData.holes,
      course: gameData.course,
    });
  };

  return gameData ? (
    <Scorecard gameData={gameData} />
  ) : (
    <div className="game-setup">
      <h1>Welcome, {username}</h1>
      {showJoin ? (
        <JoinGame apiURL={apiURL} handleGameData={handleGameData} />
      ) : (
        <CreateGame apiURL={apiURL} handleGameData={handleGameData} />
      )}
      <button onClick={() => setShowJoin(!showJoin)} className="game-btn">
        {showJoin ? "Create a new game" : "Join an existing game"}
      </button>
    </div>
  );
}

export default GameSetup;

// Join an existing game
function JoinGame(props) {
  const [inputPin, setInputPin] = useState("");

  useEffect(() => {
    const existingGame = () => {
      if (sessionStorage.getItem("game_pin")) {
        setInputPin(sessionStorage.getItem("game_pin"));
      }
    };
    existingGame();
  }, []);

  // Get data from existing game
  const handleJoin = async (e) => {
    e.preventDefault();
    const response = await Axios.get(`${props.apiURL}/api/games/${inputPin}`);
    if (response.data) {
      props.handleGameData(response.data);
    }
  };

  return (
    <form onSubmit={(e) => handleJoin(e)}>
      <h2>Join Game</h2>
      <div className="form-input">
        <label htmlFor="game-pin">Game Pin</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          id="game-pin"
          value={inputPin}
          onChange={(e) => setInputPin(e.target.value)}
        />
      </div>
      <div className="form-input">
        <button
          type="submit"
          disabled={inputPin.length < 4}
          className="btn-main"
        >
          Join
        </button>
      </div>
    </form>
  );
}

// Create game with random pin and input data
function CreateGame(props) {
  const [courseName, setCourseName] = useState("");
  const [holes, setHoles] = useState(0);

  const handleCreate = async (e) => {
    e.preventDefault();
    const newPin = (Math.floor(Math.random() * 9000) + 1000).toString();
    const response = await Axios.post(`${props.apiURL}/api/games/${newPin}`, {
      course: courseName,
      holes: holes,
    });
    if (response.data) {
      props.handleGameData(response.data);
    } else {
      // If pin matches, rerun function to generate a new pin
      CreateGame();
    }
  };

  return (
    <form id="create-game" onSubmit={(e) => handleCreate(e)}>
      <h1>Create New Game</h1>
      <div className="form-input">
        <label htmlFor="course-name">Course Name:</label>
        <input
          type="text"
          id="course-name"
          maxLength={16}
          required={true}
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
      <div className="form-input">
        <label htmlFor="holes-radio">Number of Holes</label>
        <input
          type="radio"
          value={9}
          id="holes-radio"
          checked={holes === "9"}
          onChange={(e) => setHoles(e.target.value)}
        />
        <input
          type="radio"
          value={18}
          id="holes-radio"
          checked={holes === "18"}
          onChange={(e) => setHoles(e.target.value)}
        />
      </div>
      <div className="form-input">
        <button type="submit" disabled={holes === 0} className="btn-main">
          Create
        </button>
      </div>
    </form>
  );
}
