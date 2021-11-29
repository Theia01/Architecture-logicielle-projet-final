const FAKE_DB = require("../../fake_stat_db");

module.exports = {
  list: () => {
    let games = FAKE_DB.games;
    return games;
  },

  create: (obj) => {
    obj.id = "" + new Date().getUTCMilliseconds();
    //FAKE_DB.products.push(obj);
    return obj;
  },
};
