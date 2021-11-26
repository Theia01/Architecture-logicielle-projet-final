const productService = require("./../game_service");

module.exports = {
  list: (req, res) => {
    var pageUrl = url.parse(req.url, true).query;
    res.render("list.ejs", { truc: productService.list() });
  },

  createForm: (req, res) => {
    res.render("form.ejs", { errorMessage: "" });
  },

  create: (req, res) => {
    try {
      productService.create(req.body);
      res.redirect("/products/list");
    } catch (err) {
      res.render("form.ejs", { errorMessage: "bad parameters" });
    }
  },
};
