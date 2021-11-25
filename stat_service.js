const express = require("express");
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
app.get("/${host_annuaire}/register", async (req, res) => {
  // Récuperer les headers
  let headers = req.headers;

  res.json();
});

app.post("/newservice", async (req, res) => {
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
});

// enregister le service
app.get("/getKey", async (req, res) => {
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
});

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
