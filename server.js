import Database from "./database/Database.js";
import Express from "express";
import CORS from "cors";
import Path from "path";

const App = Express();
const port = process.env.PORT || 5000;

App.use(Express.json());
App.use(CORS());

// Routes for "players" collection
const dbPlayers = new Database();
dbPlayers.connect("players");

// POST ROUTE: Create a new account
App.post("/api/account/create", async (req, res) => {
  let username = req.body.username;
  const response = await dbPlayers.createAccount(username);
  res.json(response);
});

// GET ROUTE: Find account
App.get("/api/account/:username", async (req, res) => {
  let username = req.params.username;
  const response = await dbPlayers.readAccount(username);
  res.json(response);
});

App.patch("/api/account/:username", async (req, res) => {
  let username = req.params.username;
  let newPin = req.body.newPin;
  const response = await dbPlayers.addGame(username, newPin);
  res.json(response);
});

// Routes for "games" collection
const dbGames = new Database();
dbGames.connect("games");

// POST ROUTE: Create a new game
App.post("/api/games/:pin", async (req, res) => {
  let newGame = {
    pin: req.params.pin,
    course: req.body.course,
    holes: req.body.holes,
  };
  const response = await dbGames.createGame(newGame);
  res.json(response);
});

// GET ROUTE: Search the game database and return the game details
App.get("/api/games/:pin", async (req, res) => {
  let gamePin = req.params.pin;
  const response = await dbGames.readOne(gamePin);
  res.json(response);
});

// GET ROUTE: Search for multiple games with an array of pins
App.get("/api/player/games", async (req, res) => {
  let pinArray = req.query.pinArray;
  const response = await dbGames.readMany(pinArray);
  res.json(response);
});

// PATCH ROUTE: Add a player to the game
App.patch("/api/games/:pin", async (req, res) => {
  let pin = req.params.pin;
  // Retrieve player data
  let playerData = {
    username: req.body.username,
    gameArray: req.body.gameArray,
  };
  const response = await dbGames.updateOne(pin, playerData);
  res.json(response);
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  const __dirname = Path.resolve();
  // Set static folder
  App.use(Express.static("client/build"));
  App.get("*", (req, res) => {
    res.sendFile(Path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listen to port
App.listen(port, () => console.log(`Server started on port ${port}`));
