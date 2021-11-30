const loginService = require('../services/LoginService');

module.exports = {

    loginForm : (req, res) => {
        res.render('login.ejs');
    },

    login : async (req, res) => {
        let user = await loginService.login(req.body.email , req.body.password);
        if(user.error){
            res.render('login.ejs', {message: user.error});
        }else{
            //user.token
            res.redirect('/game');
        }
    },

    registerForm : (req, res) => {
        res.render('register');
    },

    register : async (req, res) => {
        let user = await loginService.register(req.body);
        if(user.error){
            res.render('register.ejs', {message: user.error});
        }else{
            //user.token
            res.redirect('/game');
        }
    },

}
