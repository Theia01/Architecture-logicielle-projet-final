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
            res.redirect('/game');
        }
    },

    registerForm : (req, res) => {
        res.render('register');
    },

    register : (req, res) => {
        try {
            loginService.register(req.body);
            res.redirect('/game');
        }catch(e){
            res.render('register' , {message : e.message});
        }
    },



}
