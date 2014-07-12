/*jslint node: true*/
/*global express, */

var expr = require('express');
var mongo = require('mongo');
var bodyParser = require('body-parser');
var mongoskin = require('mongoSkin');
var app = expr();

app.use(bodyParser());
var db = mongoskin.db('mongodb://@localhost:27107/test', {safe: true});

app.get('/user:user', function (req, res) {
    'use strict';
    var input = req.params,
        user = input.user,
        mongoRequest,
        mongoResponse;

    mongoRequest = {
        name : user
    };

    mongoResponse = mongoRequest;
    res.send(mongoResponse);
});
app.get('/', function (req, res) {
    'use strict';
    console.log(req);
    res.send('Please make a request like /users:user');
});
app.get('/giveBack:user', function (req, res) {
    'use strict';
    //Look up dev balance

    //Give back

    //Send okay and new balance
});
app.get('/steal:user', function (req, res) {
    'use strict';
    //Look up user balance

    //Steal

    //Return okay and new balance
});
app.listen(1024);

module.exports = app;
