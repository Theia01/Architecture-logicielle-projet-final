const statService = require('../services/StatService');

module.exports = {

    show : async (req, res) => {
        //Check if token expire
        let token = req.cookies.token;
        
        let statUser = await statService.getScore(token);
        let userListGame = await statService.getListGame(token);
        if(statUser.error){
            if(statUser.error = "login-again"){
                //sesion expire
                res.redirect("login-again");
            }else{
                res.render('dashboard.ejs', {stat : "Inaccessible pour le moment", games : ""});
            }
        }else if(userListGame.error){
            if(userListGame.error = "login-again"){
                //sesion expire
                res.redirect("login-again");
            }else{
                res.render('dashboard.ejs', {stat : "Inaccessible pour le moment", games : ""});
            }
        }else{
            //convert Timestamp to date
            userListGame.forEach(element => {
                let d = new Date(parseInt(element.creationDate));
                element.date = d.getDate()+
                "/"+(d.getMonth()+1)+
                "/"+d.getFullYear()+
                " "+d.getHours()+
                ":"+d.getMinutes()+
                ":"+d.getSeconds();
            });
            res.render('dashboard.ejs', {stat : Math.round(parseInt(statUser)), games : userListGame});
        }
    },

    addStat : async (req, res) => {
        //Check if token expire
        let token = req.cookies.token;

        let addStat = await statService.addStat(token, req.body.numberOfQuestions, req.body.score, req.body.name);
        res.redirect("dashboard");

    },
}