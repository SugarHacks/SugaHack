var app = require('express')();
var MongoClient = require('mongodb').MongoClient;
var io = require('socket.io');
var moment = require('moment');
var request = require('request');
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
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.get('/users/:user_email/:latest', function (req, res, next) {
    'use strict';
    MongoClient.connect('mongodb://127.0.01:27017/test', function (err, db) {
            var collection = db.collection('values'),
            userEmail = req.params.user_emai,
	    latest = req.params.latest,
            cursor = collection.find({email : userEmail}, {limit : latest}),
	    cursorArray = cursor.toArray(function(err, doc){
		res.send(doc);
});
    });
});

app.get('/getLatest/:latest', function(req, res){
	'use strict';
	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){
		var collection = db.collection('values'),
		latest = req.params.latest,
		cursor = collection.find({}, {limit : latest, sort : ['date', 'desc']}),
		cursorArray = cursor.toArray(function(err, document){
			console.log(document);
			console.log('retrieving...');
			res.send(document);
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
      var paypalResponse = request.get(paypalURL, { 'auth' {
          'client-id' : clientId,
          'secret' : secret,
          'grant_type' : 'authorization_code',
          'code' : code
        };
      console.log(paypalResponse);
      });
  });
})
app.listen(1024);
