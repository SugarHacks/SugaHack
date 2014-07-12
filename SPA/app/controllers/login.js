app.controller('loginController', function ($scope, settings) {

  paypal.use( ["login"], function(login) {
    login.render ({
      "appid": "AQbfahAS3C8yTIWSmM2O06RK-JOg_0oIyTQO9iFFTD_htEygu5dWjkkqGWq6",
      "authend": "sandbox",
      "scopes": "openid",
      "containerid": "paypalLogin",
      "locale": "en-us",
      "returnurl": "http://sugahacks.me/"
    });
  });

  $scope.login = function(){
    $("#paypalLogin button").click();
  }


});