import MongoClient from "mongodb";

import dotenv from "dotenv";
dotenv.config();

export default class Database {
  constructor() {
    // Setup a default value for connection
    this.connection = null;
    // Setup a default value for database
    this.database = null;
    // Setup a default value for collection
    this.collection = null;
  }

  // Connect to the database
  async connect(collection) {
    this.connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    });
    // Select golf-app database
    this.database = this.connection.db("golf-app");
    // Select the collection
    this.collection = this.database.collection(collection);
  }

  // Collection: "players"

  // createAccount() Create an account in the players collection
  async createAccount(username) {
    if (
      this.collection != null &&
      (await this.collection.findOne({ username: username })) == null
    ) {
      let newAccount = {
        username: username,
        games: [],
      };
      this.collection.insertOne(newAccount);
      return { username: username };
    }
  }

  // readAccount() Find account in players collection
  async readAccount(username) {
    if (this.collection != null) {
      let findAccount = await this.collection.findOne({ username: username });
      return findAccount;
    }
  }

  async addGame(username, newPin) {
    if (this.collection != null) {
      let addPin = await this.collection.updateOne(
        { username: username },
        { $push: { games: newPin } }
      );
      if (addPin.modifiedCount > 0) {
        return { added: newPin };
      }
    }
  }

  // Collection: "games"

  // createGame() Create a new game
  async createGame(game) {
    if (
      this.collection != null &&
      (await this.collection.findOne({ pin: game.pin })) == null
    ) {
      let newGame = {
        course: game.course,
        pin: game.pin,
        holes: game.holes,
        date: new Date(),
        players: [],
      };
      await this.collection.insertOne(newGame);
      // Respond with created game
      return newGame;
    }
  }

  // readOne() Retrieve a game based on the pin number
  async readOne(pin) {
    if (this.collection != null) {
      const findGame = await this.collection.findOne({
        pin: pin,
      });
      return findGame;
    }
  }

  // readMany() Retrieve multiple games based on an array of pins
  async readMany(pinArray) {
    if (this.collection != null) {
      let playerGames = [];
      const searchGames = this.collection.find({
        pin: { $in: pinArray },
      });
      await searchGames.sort({ date: -1 }).forEach((document) => {
        playerGames.push(document);
      });
      return { games: playerGames };
    }
  }

  // updateOne() Add player/Update player score within game
  async updateOne(pin, playerData) {
    if (this.collection != null) {
      // let status = { status: "Failed" };
      // let updateGame = newPlayer
      //   ? // If the user is new, add them to the players array
      let updateGame = await this.collection.updateOne(
        { pin: pin },
        { $push: { players: playerData } }
      );
      // : // If the user is NOT new, update their score
      //   await this.collection.updateOne(
      //     { pin: pin, "players.username": playerData.username },
      //     { $set: { "players.$.gameArray": playerData.gameArray } }
      //   );
      if (updateGame.modifiedCount > 0) {
        return playerData;
      }
    }
  }

  close() {
    if (this.connection != null) {
      this.connection.close();
    }
  }
}
