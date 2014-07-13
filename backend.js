var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(bodyParser.json());

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

var connectToMongo = function (callback) {
    MongoClient.connect('mongodb://127.0.0.1:27017/test', callback);
};

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    if (req.method === 'OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

app.get('/users/:user_email/:latest', function(req, res, next) {
    'use strict';
    connectToMongo(function(err, db) {
        var collection = db.collection('values'),
            userEmail = req.params.user_email,
            latest = req.params.latest,
            cursor = collection.find({
                email: userEmail
            }, {
                limit: latest
            }),
            cursorArray = cursor.toArray(function(err, doc) {
                res.send(doc);
            });
    });
});

app.get('/getLatest/:latest', function(req, res) {
    'use strict';
    connectToMongo(function(err, db) {
        var collection = db.collection('values'),
            latest = req.params.latest,
            cursor = collection.find({}, {
                limit: latest,
                sort: ['date', 'desc']
            }),
            cursorArray = cursor.toArray(function(err, document) {
                console.log(document);
                console.log('retrieving...');
                res.send(document);
            });
    });
});

app.post('/giveCode/:code', function(req, res) {
    'use strict';
    connectToMongo(function(err, db) {
        var clientId = "AQbfahAS3C8yTIWSmM2O06RK-JOg_0oIyTQO9iFFTD_htEygu5dWjkkqGWq6";
        var secret = "EN6kcRBienNVzugfc9p1x3T3GleccZK2SaA3buglqfec8TiKaFP0lny1c5wF";
        var code = req.params.code;
        var paypalURL = 'https://api.sandbox.paypal.com/v1/identity/openidconnect/tokenservice';
    });
});

var computeScore = function (glucose) {
    if  (glucose >= 250 ){
        return -2;
    } else if (glucose < 60 || glucose > 180){
        return -1;
    } else if (glucose >80 && glucose<140){
        return 1
    } else {
        return 0
    }
    
};

app.post('/users/data', function (req, res) {
    connectToMongo(function(err, db) {
        if (err)
            return res.send(500, err);
        async.each(req.body, function (item, next) {
            db.collection('values').insert({
                email: item.email,
                glucose: item.glucose,
                date: item.date,
                time: item.time,
                marginal_score: computeScore(item.glucose)
            }, next);
        }, function (err) {
            if (err)
                res.send(500, err);
            else
                res.send();
        });
    });
});

app.post('/giveCode/:code', function(req, res){
	'use strict';
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){
      var clientId = "AQbfahAS3C8yTIWSmM2O06RK-JOg_0oIyTQO9iFFTD_htEygu5dWjkkqGWq6";
      var secret = "EN6kcRBienNVzugfc9p1x3T3GleccZK2SaA3buglqfec8TiKaFP0lny1c5wF";
      var code = req.params.code;
      var paypalURL = 'https://api.sandbox.paypal.com/v1/identity/openidconnect/tokenservice';
      var paypalResponse = request.get(paypalURL, { 'auth': {
          'client-id' : clientId,
          'secret' : secret,
          'grant_type' : 'authorization_code',
          'code' : code
        }});
      console.log(paypalResponse);
      });
  });
})

app.listen(1024);
