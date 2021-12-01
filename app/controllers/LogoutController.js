module.exports = {

    logout : (req, res) => {
        res.clearCookie('token');
        res.render('login.ejs');
    },
}