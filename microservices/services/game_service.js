const gameDAO = require("../dao/game_dao");

module.exports = {
  list: () => {
    return gameDAO.list();
  },

  create: (obj) => {
    const isNameValid =
      typeof obj["question"] === "string" &&
      data["name"].length > 3 &&
      data["name"].length < 100;

    const isPriceValid = data["price"] > 0;

    if (isPriceValid && isNameValid) {
      return gameDAO.create(obj);
    } else {
      throw new Error("BAD PARAMETERS YOU SUCKS");
    }
  },
};
