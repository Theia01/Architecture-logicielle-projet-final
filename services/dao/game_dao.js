const FAKE_DB = require("../../fake_game_db");

module.exports = {
  list: () => {
    let products = FAKE_DB.products;
    return products;
  },

  listSortedById: () => {
    let products = FAKE_DB.products;
    return products.sort(function (a, b) {
      return a._id - b._id;
    });
  },

  listSortedByPrice: () => {
    let products = FAKE_DB.products;
    return products.sort(function (a, b) {
      return a.price - b.price;
    });
  },

  listSortedByName: () => {
    let products = FAKE_DB.products;
    return products.sort((a, b) => a.name.localeCompare(b.name));
  },

  create: (obj) => {
    obj._id = "" + new Date().getUTCMilliseconds();
    obj.creation_date = new Date().toISOString();
    FAKE_DB.products.push(obj);
    return obj;
  },
};
