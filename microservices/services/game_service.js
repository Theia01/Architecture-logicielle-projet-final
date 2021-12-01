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

  create: (obj) => {
    const isQuestionValid =
      typeof obj["question"] === "string" &&
      data["question"].length > 5 &&
      data["quesion"].length < 200;

    //si au moins une réponse
    const isResponseValid =
      typeof obj["response"] === "array" && obj["response"].length > 0;

    const isDifficultyValid =
      typeof data["difficulty"] === "int" &&
      data["difficulty"] > 0 &&
      data["difficulty"] <= 3;

    if (isQuestionValid && isResponseValid && isDifficultyValid) {
      return gameDAO.create(obj);
    } else {
      throw new Error("BAD PARAMETERS YOU SUCKS");
    }
  },
};
