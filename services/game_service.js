//point d'entrée du service GAME
const express = require("express");

global.FAKE_GAME_DB = require("./../fake_game_db");
const gameController = require("./controllers/game_controller");

const axios = require("axios");
const bodyparser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(bodyparser.json());
const port = 3000;
//const host_annuaire = "http://10.8.0.14:3000";

// Fonction lancée eu démarrage du service
const start = async () => {
  // Envoie d'une requete
};

/*async function unlockService(encryptedKey, codeAuth) {
  try {
    response = await axios.post(
      "http://10.8.0.2:1338/key/unlock",
      { headers: { "x-auth-token": personalToken } },
      { code: codeAuth, key: encryptedKey }
    );
  } catch (e) {
    console.error(e.response ? e.response.data : e);
    return;
  }
}*/

// enregister le service
app.get("/questions", async (req, res) => {
  if (gameController.list) {
    gameController.list(req, res);
  } else {
    res.send("Not implemented");
  }
});

/*app.post("/newservice", async (req, res) => {
  // Récuperer les headers

  let body = req.body;
  let headers = req.headers;
  console.log("HEEEERE");
  console.log(headers + "\n");
  let key;
  let code;
  key = await getEncryptedKeys(response["host"]);
  code = response["code"];
  unlockService(key, code);
  res.json();
});*/

// enregister le service
/*app.get("/getKey", async (req, res) => {
  //récupérer les headers
  let headers = req.headers;
  let tokenToCkeck = headers["x-auth-token"];

  let response;
  try {
    response = await axios.post(
      "http://10.8.0.2:1338/token/validate",
      { token: tokenToCkeck },
      { headers: { "x-auth-token": personalToken } }
    );
  } catch (e) {
    if (e.response.status == 403) {
      res.sendStatus(403);
      console.log(403);
    } else {
      res.sendStatus(500);
      console.log(500);
    }
    console.error(e.response ? e.response.data : e);
    return;
  }

  let isTokenValid = response.data["valid"];
  if (isTokenValid) {
    return res.json({
      encrypted_public_key: encrypt(secretKey, publicKey),
      MDR: emoji,
    });
  } else {
    res.sendStatus(403);
  }
});*/

// ping le service
app.get("/ping", async (req, res) => {
  // Récuperer les headers
  let headers = req.headers;
  console.log(headers);

  res.json();
});

// ping le service
app.get("/registry", async (req, res) => {
  // Récuperer les headers
  let headers = req.headers;
  console.log(headers);

  res.json();
});

// Création d'un endpoint en POST
app.post("/${host_annuaire}/token/validate", async (req, res) => {
  // Récuération du body
  let body = req.body;
  let headers = req.headers;
  //console.log(body);
  //console.log(headers);
  res.json();
});

// Lancement du service
app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`);
  start();
});

app.post("/key/unlock", async (req, res) => {
  // Récuération du body
  let body = req.body;
  let headers = req.headers;
  //console.log(body);
  //console.log(headers);
  res.json();
});
