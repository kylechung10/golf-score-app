import React, { useState, useEffect } from "react";
import Axios from "axios";
import Scorecard from "../Scorecard";
import "./GameSetup.scss";

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
    <div className="page-container game-setup">
      <div className="game-setup-title">
        <h3>Welcome, {username}!</h3>
        <h1>{showJoin ? "Join" : "Create"} Game</h1>
        <p>
          {showJoin
            ? "Enter 4-digit PIN of an exisiting game!"
            : "Create a new game for others to join!"}
        </p>
      </div>
      {showJoin ? (
        <JoinGame apiURL={apiURL} handleGameData={handleGameData} />
      ) : (
        <CreateGame apiURL={apiURL} handleGameData={handleGameData} />
      )}
      <div className="screen-switch">
        <label htmlFor="game-switch">
          {showJoin ? "Create a new game" : "Join an existing game"}
        </label>
        <button onClick={() => setShowJoin(!showJoin)} id="game-switch">
          {showJoin ? "New Game" : "Join Game"}
        </button>
      </div>
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
      <div className="form-input">
        <label htmlFor="game-pin">Game Pin</label>
        <input
          type="text"
          placeholder="Enter 4-Digit PIN"
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
      <div className="form-input">
        <label htmlFor="course-name">Course Name</label>
        <input
          type="text"
          id="course-name"
          placeholder="Enter course name"
          maxLength={24}
          required={true}
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
      <div className="form-input course-type">
        <label htmlFor="holes-btn" className="course-type-label">
          Course Type
        </label>
        <br />
        <div className="btn-container">
          <button
            type="button"
            id="holes-btn"
            className="course-type-btn"
            disabled={holes === 9}
            onClick={() => setHoles(9)}
          >
            9-Hole
            <br />
            Course
          </button>
          <button
            type="button"
            id="holes-btn"
            className="course-type-btn"
            disabled={holes === 18}
            onClick={() => setHoles(18)}
          >
            18-Hole
            <br />
            Course
          </button>
        </div>
      </div>
      <div className="form-input">
        <button
          type="submit"
          disabled={holes === 0 || courseName === ""}
          className="btn-main"
        >
          Create
        </button>
      </div>
    </form>
  );
}
