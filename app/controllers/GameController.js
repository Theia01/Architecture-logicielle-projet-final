const gameService = require('../services/GameService');

module.exports = {

    show : async (req, res) => {
        //verifier si log
        var token = req.cookies.token;

        //get themes
        let themes = [25, 'Animals', 'Celebrities', 'Sports', 'Vehicules', 'Geography'];
        
        //get difficulties
        let difficulties = ['easy', 'medium', 'hard'];

        res.render('game.ejs', {theme: themes, difficulty : difficulties});
    },

    getQuestions : async (req, res) => {
        var token = req.cookies.token;

        //Appel microservice game pour récupérer les questions
        let questions = await gameService.questions(token, req.body.theme, req.body.difficulty, req.body.number);
        if(questions.error){
            if(questions.error = "login-again"){
                res.redirect("login-again");
            }
            res.render('game.ejs', {message: questions.error});
        }else{
            res.render('quiz.ejs', {quest : questions});
        }

        //code 401 si l'utilisateur n'est pas connecter
    },
}


//Penser middleware auth
