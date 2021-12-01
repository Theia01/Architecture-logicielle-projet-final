const gameDAO = require("../dao/game_dao");

module.exports = {
  list: () => {
    return gameDAO.list();
  },

  listWithParameters: async (req, res) => {
    const theme = req.body.theme;
    const difficulty = req.body.difficulty;
    const nbQuestion = req.body.number;
    return await gameDAO.getQuestions(theme, difficulty, nbQuestion);
  },

  getCategories: async (req, res) => {
    return await gameDAO.getCategories(req, res);
  },
};
