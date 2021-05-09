import React from "react";

function GameResults(props) {
  const { detailsDisplay } = props;

  console.log(detailsDisplay);

  // Create top row based on how many holes there were
  let holeRows = [];
  for (let i = 0; i < detailsDisplay.holes; i++) {
    holeRows.push(<td key={i}>{i + 1}</td>);
  }

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
    <table>
      <thead>
        <tr>
          <th>Player Scores</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Name</th>
          {holeRows}
          <th>Total</th>
        </tr>
        {playerMap}
      </tbody>
    </table>
  );
}

export default GameResults;
