var passport = require('passport');
require('./config/passport.js')(passport);

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var sessions = require('client-sessions');
var bodyParser = require('body-parser');

var logsController = require('./app/controllers/logsController.js');


app.use(express.static('public'));
app.use(cookieParser('blargadeeblargblarg'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
  cookieName: 'xyz', // cookie name dictates the key name added to the request object
  secret: 'blargadeeblargblarg', // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function (req, res) {
	res.sendFile( __dirname + "/public/" + "index.html" );
});

app.post('/logs', function (req, res) {
  logsController.create(req, res);
});
app.get('/logs', function (req, res) {
  logsController.all(req, res);
});
app.patch('/logs/:logId', function (req, res) {
  logsController.edit(req, res);
});


function isLoggedIn(req, res, next) {
	if (req.xyz.user) {
        next()
    } else {
        res.send({ 'loggedIn': false });
    }
}

app.get('/loggedIn', isLoggedIn, function (req, res) {
	res.send({ 'loggedIn': true });
});


app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect : '/'
    }), function (req, res, user) {
    	req.xyz.user = req.user;
    	res.redirect('/');
    }
);


var server = app.listen(process.env.PORT || 8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
