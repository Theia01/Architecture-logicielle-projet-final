//point d'entrée du service STAT
var url = require("url");
const express = require("express");

const axios = require("axios");
const bodyparser = require("body-parser");
const crypto = require("crypto");
const statController = require("./services/stat_service");
const app = express();
app.use(bodyparser.json());
const port = 3002;

app.get("/stat", async (req, res) => {
  try {
    var pageUrl = url.parse(req.url, true).query;
    res.json(statController.list());
  } catch (err) {
    console.error(err);
  }
});

app.get("/games", async (req, res) => {
  try {
    var pageUrl = url.parse(req.url, true).query;
    res.json(statController.list());
  } catch (err) {
    console.error(err);
  }
});

app.post("/game", async (req, res) => {
  // Récuperer les headers

  if (statController.create) {
    statController.create(req, res);
  } else {
    res.send("Not implemented");
  }
});

// Lancement du service
app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`);
  //start();
});

/*const start = async () => {
  // Envoie d'une requete
  let response;
  response = await getInfos();

  console.log(response.data);

  personalToken = response.data["token"];
  secretKey = response.data["secret_key"];
  publicKey = response.data["public_key"];

  //on récupère la liste des différents services
  response = await getServices();

  console.log(response.data, response.data.length);

  let responseHost;
  let responseCode;
  for (i in response.data) {
    responseHost = await getEncryptedKeys(response.data[i]["host"]);
    //console.log("response host : ", responseHost);
    await unlockService(
      responseHost.data["encrypted_public_key"],
      response.data[i]["code"]
    );
  }
};
*/
