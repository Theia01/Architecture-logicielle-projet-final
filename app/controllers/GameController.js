const gameService = require('../services/GameService');

module.exports = {

    show : async (req, res) => {
        //verifier si log
        var token = req.cookies.token;

        //get themes
        let themes = ['cuisine', 'politique', 'marvel'];
        
        //get difficulties
        let difficulties = ['facile', 'difficile', 'moyen'];

        res.render('game.ejs', {theme: themes, difficulty : difficulties});
    },

    getQuestions : async (req, res) => {
        var token = req.cookies.token;
        
        //Appel microservice game pour récupérer les questions
        let questions = await gameService.questions(token, req.body.category, req.body.theme);

        //code 401 si l'utilisateur n'est pas connecter
        res.render('quizz.ejs');
    },
}


//Penser middleware auth
