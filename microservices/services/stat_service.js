const statDAO = require("../dao/stat_dao");

module.exports = {
  //récupère le % de bonnes réponses totales
  userStats: (id, res) => {
    return statDAO.userStats(id);
  },

  userGames: (req, res) => {
    return statDAO.userGames(req.userId);
  },

  createGame: (obj) => {
    // const isQuestionValid =
    //   typeof obj["question"] === "string" &&
    //   data["question"].length > 5 &&
    //   data["quesion"].length < 200;

    // //si au moins une réponse
    // const isResponseValid =
    //   typeof obj["response"] === "array" && obj["response"].length > 0;

    // const isDifficultyValid =
    //   typeof data["difficulty"] === "int" &&
    //   data["difficulty"] > 0 &&
    //   data["difficulty"] <= 3;

    const isScoreValid =
      typeof obj.score === "number" && obj.score <= obj.numberOfQuestions;
    const isNumberOfQuestionValid = typeof obj.numberOfQuestions === "number";
    if (isScoreValid && isNumberOfQuestionValid) {
      return statDAO.create(obj);
    } else {
      throw new Error("BAD PARAMETERS YOU SUCKS");
    }
  },
};
