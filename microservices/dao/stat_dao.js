const { stats } = require("../../fake_stat_db");
const FAKE_DB = require("../../fake_stat_db");

module.exports = {
  userStats: (userId) => {
    let userStats = FAKE_DB.stats.find((stats) => {
      return userId == stats.userId;
    });
    let totalOfQuestions = 0;
    let totalOfScore = 0;
    let total = 0;
    //calcule le % de bonnes réponses par rapport au total des questions
    if (userStats.gamesId.length > 0) {
      userStats.gamesId.forEach((element) => {
        const game = FAKE_DB.games.find((games) => {
          return element === games.gameId;
        });
        totalOfQuestions += game.numberOfQuestions;
        totalOfScore += game.finalScore;
      });
      total = (totalOfScore / totalOfQuestions) * 100;
    }
    return total;
  },

  userGames: (userId) => {
    let userStats = FAKE_DB.stats.find((stats) => {
      return userId == stats.userId;
    });
    let games = [];
    //récupère toutes les partiesqu'un utilisateur a faites
    if (userStats.gamesId.length > 0) {
      userStats.gamesId.forEach((element) => {
        games.push(
          FAKE_DB.games.find((games) => {
            return element === games.gameId;
          })
        );
      });
    }
    return games;
  },

  createGame: (userId, obj) => {
    obj.id = "" + new Date().getUTCMilliseconds();
    FAKE_DB.games.push(obj);
    let statsUser = FAKE_DB.stats.find(userId === stats.userId);
    statsUser.gamesId.push(obj.id);
  },

  create: (obj) => {
    obj.gameId = "" + new Date().getUTCMilliseconds();
    FAKE_DB.games.push(obj);
    return obj;
  },
};
