import React from "react";
import "./About.scss";

function About() {
  const itemArray = [
    {
      title: "Join",
      src: "join.jpg",
      alt: "Join game screenshot",
      description:
        "Join an existing game created by another user with ease. Simply enter the 4-digit PIN displayed on their scorecard screen.",
    },
    {
      title: "Create",
      src: "create.jpg",
      alt: "Create game screenshot",
      description:
        "Create a new game for others to join or just for yourself. Just enter the course name and course type.",
    },
    {
      title: "Play",
      src: "play.jpg",
      alt: "Scorecard screenshot",
      description: "Keep track of your score after joining or creating a game.",
    },
    {
      title: "View Scores",
      src: "history.jpg",
      alt: "Game history screenshot",
      description:
        "View a list of all your previous games! Full details about each game are available too. Details include date, game PIN, course name/type, and a table of all the players with their strokes & total score.",
    },
  ];

  return (
    <>
      <div className="page-container about">
        <div className="about-header">
          <h1>About</h1>
          <h2>Golf With Friends</h2>
          <h4>The multiplayer golf scorecard</h4>
          <p>
            Created by{" "}
            <a href="https://kylechung.com/" target="_blank" rel="noreferrer">
              Kyle Chung
            </a>
          </p>
        </div>
        <div className="about-content">
          {itemArray.map((item, index) => (
            <div className="about-item" key={index}>
              <h1>{item.title}</h1>
              <img
                src={process.env.PUBLIC_URL + "/img/" + item.src}
                alt={item.alt}
              />
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <span>&copy; 2021, Golf With Friends</span>
      </footer>
    </>
  );
}

export default About;
