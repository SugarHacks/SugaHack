app.controller('dashboardController', function($scope,$timeout, $rootScope,settings) {
  $(document).ready(function(){
    $timeout(function(){
      $scope.isReady= true;
    },10);
  });
});
