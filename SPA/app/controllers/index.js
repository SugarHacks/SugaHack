app.controller('indexController', function ($scope) {
  socket.on("connect", function(){
    $scope.readyState = "show";
  });
});