const FAKE_DB = require("../../fake_game_db");

module.exports = {
  list: () => {
    let products = FAKE_DB.questions;
    return products;
  },

  listWithParameters: (category, number, difficulty) => {
    let products = FAKE_DB.questions.find((question) => {
      return question.themes.includes(category) && difficulty === difficulty;
    });
  },

  create: (obj) => {
    obj.id = "" + new Date().getUTCMilliseconds();
    FAKE_DB.products.push(obj);
    return obj;
  },
};
