const fs = require('fs')
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const { OAuth2Strategy } = require('passport-google-oauth');
require("dotenv").config();

// For this to work, you have to make a .env file with the info from https://console.cloud.google.com/
// Example: CLIENT_ID=GoogleClientIDHere
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const PORT = 3069;
if (!fs.existsSync('data.json')) {
    fs.writeFileSync('data.json', '{}');
}
const app = express();
const data = JSON.parse(fs.readFileSync('data.json'));

// Allow express to use the 'public' folder
app.use(express.static('public'));

// Read JSON data from HTML POST requests
app.use(bodyParser.json());

// Use ejs to render html templates in 'views'
app.set('view engine', 'ejs');

// Setup Google Auth
app.use(passport.initialize());
app.use(passport.session());

// Store user session data
app.use(session({
    secret: 'ohnose!',
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser(function(user, callback) {
    callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
});

passport.use(new OAuth2Strategy(
    {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:3069/login/callback",
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        return done(null, {
            profile: profile,
            username: req.session.requestedUsername
        });
    }
));

// Middleware checks if user is logged in before continuing
function isAuthenticated(req, res, next) {
    if (req.session.user) return next();
    res.redirect(`/login`);
};

// Root / homepage
app.get('/', isAuthenticated, (req, res) => {
    let userData = {};
    if (req.session.user in data) {
        userData = data[req.session.user];
    } else {
        data[req.session.user] = { highscore: 0 };
        userData = data[req.session.user];
    }
    res.render('start', { user: userData });
});

app.get('/game', isAuthenticated, (req, res) => {
    let userData = {};
    if (req.session.user in data) {
        userData = data[req.session.user];
    } else {
        data[req.session.user] = { highscore: 0 };
        userData = data[req.session.user];
    }
    res.render('game', { user: userData });
});

app.get('/howplay', isAuthenticated, (req, res) => {
    res.render('howplay');
});

app.get('/credits', isAuthenticated, (req, res) => {
    res.render('credits');
});

app.get('/leaderboards', isAuthenticated, (req, res) => {
    const leaders = [];
    for (const player of Object.keys(data)) {
        const leaderboardData = {};
        leaderboardData[player] = data[player].highscore;
        leaders.push(leaderboardData);
    }

    leaders.sort((a, b) => a.highscore - b.highscore)
    res.render('leaders', { leaders: leaders });
});

app.post('/submiths', (req, res) => {
    if (req.session.user in data) {
        if (typeof req.body.score === 'number' && req.body.score > data[req.session.user].highscore)
            data[req.session.user] = { highscore: req.body.score };
    } else {
        if (typeof req.body.score === 'number')
            data[req.session.user] = { highscore: req.body.score };
    }
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json({ message: "accepted" });
});

// Use Google OAuth2 rather than login data from Formbar
app.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('login');
});

app.get('/login/auth', (req, res) => {
    if (req.session.user) return res.redirect('/');
    if (!req.query.username || req.query.username == "") return res.redirect('/login');
    req.session.requestedUsername = req.query.username;
    passport.authenticate('google', { scope : ['email'], passReqToCallback: true })(req, res);
});

app.get('/login/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    if (req.session.user) return res.redirect('/');

    const username = req.user?.username;
    const email = req.user?.profile.emails[0].value;
    const currentData = data[username];
    if (currentData && currentData.email && currentData.email != email) return res.redirect('/');

    data[username] = { email: email, highscore: 0 }
    fs.writeFileSync('data.json', JSON.stringify(data));
    req.session.user = username;
    res.redirect('/');
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
});