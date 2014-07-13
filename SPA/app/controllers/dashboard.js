app.controller('dashboardController', function($scope,$timeout, $rootScope,settings, user) {
  $(document).ready(function(){
    $timeout(function(){
      $scope.isReady= true;
    },100);
  });


});
