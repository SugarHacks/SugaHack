var express = require('express')
  , http = require('http')
  , fs = require('fs')




var app = express();
var clients = [];

GLOBAL.app = app;



app.set('port', process.env.PORT || 1400);


app.use(express.static("SPA"));




var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Starting Bluefire ' + app.get('port'));
});




app.get('/*', function (req, res) {
  fs.readFile('SPA/index.html', 'utf8', function(err, text){
        res.send(text);
    });

});


