const express = require('express');
const bodyParser = require('body-parser')
const loginController = require('./controllers/LoginController');
const gameController = require('./controllers/GameController');
const logoutController = require('./controllers/LogoutController');
const app = express();
const port = 3000;
global.MICROSERVICE_USER = 'http://localhost:3001';
global.TOKEN_KEY = "vz5g405rnt4he-reh14h25te1grj56rzy4qhrde5tj56";

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
   res.redirect("login");
});

// FORMULAIRE DE LOGIN
app.get('/login', (req, res) => {
    loginController.loginForm(req, res);
});

// LOGIN
app.post('/login', (req, res) => {
    loginController.login(req, res);
});

// FORMULAIRE DE LOGIN
app.get('/register', (req, res) => {
    loginController.registerForm(req, res);
});

// LOGIN
app.post('/register', (req, res) => {
    loginController.register(req, res);
});

// GAME
app.get('/game', (req, res) => {
    gameController.show(req, res);
});

// FORMULAIRE POUR RECUPERER QUESTIONS
app.post('/game', (req, res) => {
    gameController.getQuestions(req, res);
});

// FORMULAIRE POUR RECUPERER QUESTIONS
app.get('/logout', (req, res) => {
    logoutController.logout(req, res);
});

app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`)
});
