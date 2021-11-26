var url = require("url");
const express = require("express");

const axios = require("axios");
const bodyparser = require("body-parser");
const crypto = require("crypto");
const gameService = require("./services/game_service");
const app = express();
app.use(bodyparser.json());
const port = 3001;

app.get("/questions", async (req, res) => {
  try {
    var pageUrl = url.parse(req.url, true).query;
    res.json(gameService.list());
  } catch (err) {
    console.error(err);
  }
});

app.post("/questions", async (req, res) => {
  // Récuperer les headers

  if (gameController.create) {
    gameController.create(req, res);
  } else {
    res.send("Not implemented");
  }
});

// Lancement du service
app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`);
  //start();
});
