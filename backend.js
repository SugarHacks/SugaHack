/*jslint node: true*/
/*global hashids*/

var app = require('express')();
var MongoClient = require('mongodb').MongoClient;
var io = require('socket.io');
var moment = require('moment');
var Hashids = require('hashids');
var hash = new Hashids('iknowthisisntagoodsalt');

// var getAuthCode = function (url) {
//     'use strict';
//     var regex = /&code=(.*)/,
//         matches = url.match(regex);
//
//     if (matches[0]) {
//         return matches[1]; //I know this looks weird, but trust me
//     }
//     return false;
// };

app.get('/users:user_email', function (req, res, next) {
    'use strict';
    MongoClient.connect('mongodb://127.0.01:27017/test', function (err, db) {
        if (err) { throw err; }
        var collection = db.collection('values'),
            userEmail = req.params[0],
            userEmailEncrypted = hash.encrypt(userEmail);
        res.send(collection.find({user : userEmailEncrypted}));
        return next();
    });
});

app.post('/user_insert:user', function (req, res, next) {
    'use strict';
    MongoClient.connect('mongodb:/127.0.0.1:27017/test', function (err, db) {
        if (err) { throw err; }
        var collection = db.colection('values'),
            userToPush = req.params[0],
            userEncrypted = hash.encrypt(userToPush);
        res.send(collection.insert({user : userEncrypted}));
        return next();
    });
});

// app.post('/send_token:token', function(req, res, next){
//     'use strict';
//     MongoClient.connect('mongodb.127.0.0.1:27017/test' function (err, db){
//         if (err) { throw err; }
//         var params
//     })
// });
app.listen(1024);

module.export = app;
