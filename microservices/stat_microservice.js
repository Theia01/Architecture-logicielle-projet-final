//point d'entrée du service STAT
var url = require("url");
const express = require("express");

const axios = require("axios");
const bodyparser = require("body-parser");
const statService = require("./services/stat_service");
const app = express();
app.use(bodyparser.json());
const port = 3003;

const loginMicroservice = "http://localhost:3002";

app.get("/stat", async (req, res) => {
  const validation = await validate(req.body.token);
  if (typeof validation !== "number") {
    console.log(validation.data.id);
    res.json(statService.userStats(validation.data.id, res));
  } else {
    res.sendStatus(401); //unauthorized
  }
});

app.get("/games", async (req, res) => {
  const validation = await validate(req.body.token);
  if (typeof validation !== "number") {
    try {
      res.json(statService.userGames(validation.data.id, res));
    } catch (err) {
      console.error(err);
    }
  } else {
    res.sendStatus(401); //unauthorized
  }
});

app.post("/games", async (req, res) => {
  // Récuperer les headers

  if (statService.create) {
    statService.createGame(req, res);
  } else {
    res.send("Not implemented");
  }
});

async function validate(token) {
  let response;
  try {
    response = await axios.get(loginMicroservice + "/validate", {
      data: {
        token: token,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
    if (e.response.status === 403) {
      response = 403;
    } else if (e.response.status === 401) {
      response = 401;
    } else {
      response = 500;
    }
    console.log("response of validate function : ", response);
    return response;
  }
}

async function getId(token) {
  let response;
  try {
    response = await axios.get(loginMicroservice + "/userId", {
      data: {
        token: token,
      },
    });
  } catch (e) {
    if (e.response.status === 403) {
      response = 403;
    } else if (e.response.status === 401) {
      response = 401;
    } else {
      response = 500;
    }
    return response;
  }
}

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
