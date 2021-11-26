var url = require("url");
const express = require("express");

const axios = require("axios");
const bodyparser = require("body-parser");
const crypto = require("crypto");
const loginService = require("./services/login_service");
const app = express();
app.use(bodyparser.json());
const port = 3001;

app.get("/login", async (req, res) => {
  try {
    let token = loginService.login(req.body.email, req.body.password);
    res.json(token);
  } catch (err) {
    console.error(err);
  }
});

app.post("/questions", async (req, res) => {
  // Récuperer les headers

  if (loginController.create) {
    loginController.create(req, res);
  } else {
    res.send("Not implemented");
  }
});

app.get("/validate", async function (req, res) {
  loginController.validate(req, res);
});

// Lancement du service
app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`);
  //start();
});
