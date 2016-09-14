var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User  = require('./models/user');
var Link  = require('./models/link');

var config=require('./config');

//Midlwere
app.set('views', path.join(__dirname, 'views'));
app.set('pages engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

var apiRouters=require('./routes/index');
app.use('/index',apiRouters.api(app, express));

var linkRoute=require('./routes/linkRoute');
app.use('/link',linkRoute.link(app,express));

var followLinkRoute=require('./routes/followLink');
app.use('/follow',followLinkRoute.follow(app,express));

var tagsRoute=require('./routes/tagRoute');
app.use('/tag',tagsRoute.tag(app,express));

app.use(express.static(__dirname + '/../public'));

app.get('/users',function(req,res,next){
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

app.get('/linki',function(req,res,next){
    Link.find({tags:"asd"},function (err, link) {
        if (err) return next(err);
        res.json(link);
    });
});


module.exports = app;
