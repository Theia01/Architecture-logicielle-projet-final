const statService = require('../services/StatService');

module.exports = {

    show : async (req, res) => {
        //Check if token expire
        let token = req.cookies.token;
        
        let statUser = await statService.getScore(token);
        if(statUser.error){
            if(statUser.error = "login-again"){
                //sesion expire
                res.redirect("login-again");
            }else{
                res.render('dashboard.ejs', {stat : "Inaccessible pour le moment"});
            }
        }else{
            res.render('dashboard.ejs', {stat : Math.round(parseInt(statUser))});
        }
    },

    addStat : async (req, res) => {
        //Check if token expire
        let token = req.cookies.token;

        let addStat = await statService.addStat(token, req.body.numberOfQuestions, req.body.score);
        res.redirect("dashboard");

    },
}