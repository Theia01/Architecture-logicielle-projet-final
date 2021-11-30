const { stats } = require("../../fake_stat_db");
const FAKE_DB = require("../../fake_stat_db");

module.exports = {
  userStats: (userId) => {
    let stats = FAKE_DB.stats.filter(userId === stats.userId);
    let totalOfQuestions;
    let totalOfScore;

    //calcule le % de bonnes questions par rapport au total des questions
    stats.gamesId.forEach((element) => {
      const game = this.getGameFromId(element);
      totalOfQuestions += game.numberOfQuestions;
      totalOfScore += game.finalScore;
    });

    return (totalOfScore / totalOfQuestions) * 100;
  },

  userGames: (userId) => {
    let stats = FAKE_DB.stats.filter(userId === stats.userId);
    let games = [];
    //récupère toutes les partiesqu'un utilisateur a faites
    stats.gamesId.forEach((element) => {
      games.push(this.getGameFromId(element));
    });
    return games;
  },

  createGame: (userId, obj) => {
    obj.id = "" + new Date().getUTCMilliseconds();
    FAKE_DB.games.push(obj);
    let statsUser = FAKE_DB.stats.find(userId === stats.userId);
    statsUser.gamesId.push(obj.id);
  },

  getGameFromId: (gameId) => {
    return FAKE_DB.games.find(gameId === games.gameId);
  },

  create: (obj) => {
    obj.id = "" + new Date().getUTCMilliseconds();
    //FAKE_DB.products.push(obj);
    return obj;
  },
};
