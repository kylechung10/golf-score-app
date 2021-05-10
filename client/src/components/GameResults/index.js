import React from "react";

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
        <th>{player.username}</th>
        {scoreMap}
        <th>{totalScore}</th>
      </tr>
    );
  });

  return (
    <div>
      <button onClick={props.goBack}>Back</button>
      <h2>{detailsDisplay.date}</h2>
      <h3>Course Name: {detailsDisplay.course}</h3>
      <h3>Game Pin: {detailsDisplay.pin}</h3>
      <table>
        <thead>
          <tr>
            <th>Player Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Hole</th>
            {holeRows}
            <th>Total</th>
          </tr>
          {playerMap}
        </tbody>
      </table>
    </div>
  );
}

export default GameResults;
