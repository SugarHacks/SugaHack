app.controller('loginController', function ($scope, settings) {

  paypal.use( ["login"], function(login) {
    login.render ({
      "appid": settings.appId,
      "authend": "sandbox",
      "scopes": "openid",
      "containerid": "paypalLogin",
      "locale": "en-us",
      "returnurl": "http://localhost:1400/scrape"
    });
  });

  $scope.login = function(){
    $("#paypalLogin button").click();
  }


});