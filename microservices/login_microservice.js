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
    res.sendStatus(401);
  }
});

app.get("/register", async (req, res) => {
  try {
    //create user
    let newUser = await loginService.register(req.body);
    if(newUser){
      res.sendStatus(newUser.error);
    }else{
      //connect user
      let token = loginService.login(req.body.email, req.body.password);
      res.json(token);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/validate", async function (req, res) {
  res.send(loginService.validate(req, res));
});

// Lancement du service
app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`);
  //start();
});
