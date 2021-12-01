const express = require('express');
const bodyParser = require('body-parser')
const loginController = require('./controllers/LoginController');
const gameController = require('./controllers/GameController');
const logoutController = require('./controllers/LogoutController');
const dashboardController = require('./controllers/DashboardController');
const app = express();
const port = 3000;
global.MICROSERVICE_USER = 'http://localhost:3001';
global.MICROSERVICE_GAME = 'http://localhost:3002';
global.MICROSERVICE_STAT = 'http://localhost:3003';

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

// FORMULAIRE DE LOGIN
app.get('/login-again', (req, res) => {
    loginController.loginFormError(req, res);
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

// SCORE
app.get('/dashboard', (req, res) => {
    dashboardController.show(req, res);
});

// FORMULAIRE POUR RECUPERER QUESTIONS
app.get('/logout', (req, res) => {
    logoutController.logout(req, res);
});

app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`)
});
