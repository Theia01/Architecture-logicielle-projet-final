var url = require("url");
const express = require("express");

const axios = require("axios");
const bodyparser = require("body-parser");
const crypto = require("crypto");
const gameService = require("./services/game_service");
const app = express();
app.use(bodyparser.json());
const port = 3002;

const loginMicroservice = "http://localhost:3001";

app.get("/questions", async (req, res) => {
  let validation = validate(req.body.token);
  if (typeof validation !== "number") {
    try {
      if (req.body !== "") {
        console.log(
          "RESULT : ",
          await gameService.listWithParameters(req, res)
        );
        res.json(await gameService.listWithParameters(req, res));
      } else {
        res.json(gameService.list());
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    res.sendStatus(validation); //unauthorized
  }
});

app.get("/categories", async (req, res) => {
  res.json(await gameService.getCategories(req, res));
});

// Lancement du service
app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`);
});

async function validate(token) {
  let response;
  try {
    response = await axios.get(loginMicroservice + "/validate", {
      data: {
        token: token,
      },
    });
    console.log(response);
  } catch (e) {
    if (e.response.status == 403) {
      response = 403;
    } else {
      response = 500;
    }
    console.log(response);
    return response;
  }
}
