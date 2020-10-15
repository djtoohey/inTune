const router = require("express").Router();
const passport = require("passport");
require("../../config/passport");

module.exports = function (app) {
    app.get('/auth/', (req, res) => {
        res.send(`Hello world ${req.user.displayName}`)
    })
    app.get('/auth/error', (req, res) => res.send('Unknown Error'))

    app.get('/auth/spotify', passport.authenticate('spotify', {
        scope: ["user-read-email", "user-read-private"],
        showDialog: true,
    }));

    app.get('/auth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
        function (req, res) {
            console.log(req.user)
            res.redirect('http://localhost:3000/');
        });
}
