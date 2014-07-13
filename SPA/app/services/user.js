app.factory("user", function($http, $resource,$rootScope,settings){
  var user;

  var that = this;

  if (settings.token){
    var xsrf = $.param({
      client_id: "AQbfahAS3C8yTIWSmM2O06RK-JOg_0oIyTQO9iFFTD_htEygu5dWjkkqGWq6",
      client_secret: "EN6kcRBienNVzugfc9p1x3T3GleccZK2SaA3buglqfec8TiKaFP0lny1c5wF",
      grant_type: "authorization_code",
      code:settings.token
    });


    console.log(settings.token);

    var promise = $http({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "http://localhost:1400"
        },
        url: "https://api.sandbox.paypal.com/v1/identity/openidconnect/tokenservice",
        method: "POST",
        data:xsrf
      }).then(function(resp){
        console.log(resp)

    });


    this.getUser = function(){
      return user;
    }

    this.promise = promise;
    
  }
  

  
});