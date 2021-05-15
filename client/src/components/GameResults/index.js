import React from "react";
import * as IoIcons from "react-icons/io";
import { IconContext } from "react-icons";
import "./GameResults.scss";

function GameResults(props) {
  // Pass game details
  const { detailsDisplay } = props;

  // Create top row based on how many holes there were
  let holeRows = [];
  for (let i = 0; i < detailsDisplay.holes; i++) {
    holeRows.push(<td key={i}>{i + 1}</td>);
  }

  // Sorting player array by total score
  detailsDisplay.players.sort(
    (a, b) =>
      a.gameArray.reduce((c, d) => c + d, 0) -
      b.gameArray.reduce((c, d) => c + d, 0)
  );

  // Map out each players score
  const playerMap = detailsDisplay.players.map((player, index) => {
    const scoreMap = player.gameArray.map((score, index) => (
      <td key={index}>{score}</td>
    ));
    const totalScore = player.gameArray.reduce((a, b) => a + b, 0);
    return (
      <tr key={index}>
        <th className="player-name">{player.username}</th>
        {scoreMap}
        <th className="total">{totalScore}</th>
      </tr>
    );
  });

  return (
    <>
      <div className="details-display">
        <div className="details-header">
          <IconContext.Provider value={{ color: "#1e1e1e" }}>
            <IoIcons.IoIosArrowBack id="arrow-back" onClick={props.goBack} />
          </IconContext.Provider>
          <h1>Details</h1>
        </div>
        <div className="details-info">
          <p className="small-font">{detailsDisplay.date}</p>
          <h2>{detailsDisplay.course}</h2>
          <p>
            Game Pin: <strong>{detailsDisplay.pin}</strong>
          </p>
        </div>
        <h2 id="table-heading">Scorecard</h2>
        <table id="player-scores">
          <tbody>
            <tr className="heading-row">
              <th className="hole">Hole</th>
              {holeRows}
              <th className="total">Total</th>
            </tr>
            {playerMap}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GameResults;
