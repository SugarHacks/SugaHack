app.factory("glucose", function($resource, settings){
   return {
    getLevels: function() {
      return $resource(settings.baseAddress+'/users/:userEmail/:latest',
        {
          userEmail:'@userEmail',
          latest:'@latest'
        }
      );
    }
  };  
});