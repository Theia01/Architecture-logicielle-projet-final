const userDAO = require("../dao/login_dao");
const jwt = require("jsonwebtoken");

const TOKEN_KEY = "vz5g405rnt4he-reh14h25te1grj56rzy4qhrde5tj56";

module.exports = {
  login: (email, password) => {
    if (!email || !password) {
      throw new Error("All inputs are required");
    }

    const user = userDAO.findUserByEmail(email);
    if (user && user.password === password) {
      const token = jwt.sign(user, TOKEN_KEY, {
        expiresIn: "2h",
      });

      return {
        //...user,
        token,
      };
    } else {
      throw new Error();
    }
  },

  validate: (req, res) => {
    let token = req.body.token;
    const decode = jwt.decode(token, TOKEN_KEY);
    const user = userDAO.findUserByEmail(decode.email);
    if (user) {
      return true;
    } else {
      throw new Error();
    }
  },

  register: (user) => {
    if (!user.email || !user.password || !user.pseudo) {
      console.log("Microservice LOGIN : All inputs are required");
      return { error: 400 };
    }

    //verifie si l'utilisateur n'existe pas déjà en BDD
    let checkUser = userDAO.findUserByEmail(user.email);
    if (checkUser) {
      console.log("Microservice LOGIN : User already exist");
      return { error: 409 };
    } else {
      user.registered = new Date().toISOString();
      user.isActive = true;
      userDAO.create(user);
    }
  },
};
