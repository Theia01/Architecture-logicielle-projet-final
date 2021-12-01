const FAKE_DB = require("../../fake_game_db");
const OPEN_API = "https://opentdb.com/api.php";
const url = require("url");
const https = require("https");
const axios = require("axios");
const { response } = require("express");

module.exports = {
  list: () => {
    let products = FAKE_DB.questions;
    return products;
  },

  listWithParameters: (category, number, difficulty) => {
    let products = FAKE_DB.questions.filter((question) => {
      question.themes.includes(category) && difficulty === difficulty;
    });

    if (number > products.length) {
      number = product.length;
    }

    let potentialNumbers = [];
    for (let i = 0; i < number; i++) {
      potentialNumbers.push(i);
    }
  },

  getCategories: async (req, res) => {
    const url = "https://opentdb.com/api_category.php";
    let response;
    try {
      response = await axios.get(url);
      console.log(response);
      return response.data.trivia_categories;
    } catch (e) {
      res.sendStatus(421);
      //Bad mapping
    }
  },

  getQuestions: async (theme, difficulty, number) => {
    const url =
      "https://opentdb.com/api.php?amount=" +
      number +
      "&category=" +
      theme +
      "&difficulty=" +
      difficulty;
    console.log(url);

    let response;

    try {
      response = await axios.get(url);
      return response.data.results;
    } catch (e) {
      res.sendStatus(421);
      //Bad mapping
    }
  },
};
