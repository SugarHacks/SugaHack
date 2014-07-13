app.factory("user", function($resource, settings){
  return {
    getUser: function() {
      return $resource(settings.baseAddress+'/users/:userEmail',
        {
          userEmail:'@userEmail'
        }
      );
    },
    getToken: function() {
      return $resource(settings.baseAddress+'/giveCode/:code',
        {
          code:'@code',
          method:"POST"
        }
      );
    }
  };  
});