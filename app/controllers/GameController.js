module.exports = {

    show : (req, res) => {
        //code 401 si l'utilisateur n'est pas connecter
        res.render('game.ejs');
    },
}


//Penser middleware auth
