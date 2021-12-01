const gameService = require('../services/GameService');
const loginService = require('../services/LoginService');

module.exports = {

    show : async (req, res) => {
        //verifier token
        var token = req.cookies.token;
        let checkToken = await loginService.checkToken(token);
        if(checkToken){
        
            //get themes
            let themes = await gameService.getCategories();
            if(themes.error){
                themes = "";
            }
            
            //get difficulties
            let difficulties = ['easy', 'medium', 'hard'];

            res.render('game.ejs', {theme: themes, difficulty : difficulties});
        }else{
            res.redirect("login-again");
        }
    },

    getQuestions : async (req, res) => {
        var token = req.cookies.token;

        //Appel microservice game pour récupérer les questions
        let questions = await gameService.questions(token, req.body.theme, req.body.difficulty, req.body.number);
        if(questions.error){
            if(questions.error = "login-again"){
                //sesion expire
                res.redirect("login-again");
            }else{
                let difficulties = ['easy', 'medium', 'hard'];
                //get themes
                let themes = await gameService.getCategories();
                if(themes.error){
                    themes = "";
                }
                res.render('game.ejs', {theme: themes, difficulty : difficulties, message: questions.error});
            }
        }else{
            res.render('quiz.ejs', {quest : questions});
        }

        //code 401 si l'utilisateur n'est pas connecter
    },
}


//Penser middleware auth
