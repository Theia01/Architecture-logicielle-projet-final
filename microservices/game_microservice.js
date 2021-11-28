var url = require("url");
const express = require("express");

const axios = require("axios");
const bodyparser = require("body-parser");
const crypto = require("crypto");
const gameService = require("./services/game_service");
const app = express();
app.use(bodyparser.json());
const port = 3000;

const loginMicroservice = "http://localhost:3001";

app.get("/questions", async (req, res) => {
  if (validate(res.body.token)) {
    try {
      if (req.body !== "") {
        res.json(gameService.listWithParameters(req, res));
      } else {
        res.json(gameService.list());
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    res.sendStatus(401); //unauthorized
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

async function validate(token) {
  let response;
  try {
    response = await axios.post(loginMicroservice + "/validate", {
      token: token,
    });
  } catch (e) {
    if (e.response.status == 403) {
      res.sendStatus(403);
      console.log(403);
    } else {
      res.sendStatus(500);
      console.log(500);
    }
    console.log(response);
    return response;
  }
}
