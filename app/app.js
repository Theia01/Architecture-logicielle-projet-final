const express = require('express');
const bodyParser = require('body-parser')
const loginController = require('./controllers/LoginController');
const gameController = require('./controllers/GameController');
const app = express();
const port = 3000;
global.FAKE_DB = require('./fakedb')

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

// FORMULAIRE DE LOGIN
app.get('/game', (req, res) => {
    gameController.show(req, res);
});

app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`)
});
