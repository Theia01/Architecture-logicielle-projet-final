const userDAO = require("./../dao/login_dao");
const jwt = require("jsonwebtoken");

const TOKEN_KEY = "vz5g405rnt4he-reh14h25te1grj56rzy4qhrde5tj56";

module.exports = {
  login: (email, password) => {
    if (!email || !password) {
      throw new Error("all inputs are required");
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

  validate: (token) => {
    const decode = jwt.decode(token, TOKEN_KEY);
    const user = userDAO.findUserByEmail(user.email);
    if (user) {
      return true;
    } else {
      throw new Error();
    }
  },

  register: (user) => {
    if (!user.email) {
      throw new Error("Données invalides");
    }
    user.registered = new Date().toISOString();
    user.isActive = true;
    return userDAO.create(user);
  },
};
