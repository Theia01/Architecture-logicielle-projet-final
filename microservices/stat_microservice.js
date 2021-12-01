//point d'entrée du service STAT
var url = require("url");
const express = require("express");

const axios = require("axios");
const bodyparser = require("body-parser");
const statService = require("./services/stat_service");
const app = express();
app.use(bodyparser.json());
const port = 3003;

app.get("/stat", async (req, res) => {
  let validation = await validate(req.body.token);
  if (typeof validation !== "number") {
    try {
      const id = await getId(req.body.token);
      res.json(statService.userStats(id, res));
    } catch (err) {
      console.error(err);
    }
  } else {
    res.sendStatus(401); //unauthorized
  }
});

app.get("/games", async (req, res) => {
  if (validate(req.body.token)) {
    try {
      res.json(statService.userGames(req, res));
    } catch (err) {
      console.error(err);
    }
  } else {
    res.sendStatus(401); //unauthorized
  }
});

// app.get("/games", async (req, res) => {
//   try {
//     var pageUrl = url.parse(req.url, true).query;
//     res.json(statService.list());
//   } catch (err) {
//     console.error(err);
//   }
// });

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
    console.log(response);
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

async function getId(token) {
  let response;
  try {
    response = await axios.get(loginMicroservice + "/getId", {
      data: {
        token: token,
      },
    });
    console.log(response);
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
