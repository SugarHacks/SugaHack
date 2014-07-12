app.controller('loginController', function ($scope, settings) {
  $scope.login = function(username){
    localStorage.setItem("username", username);
    localStorage.setItem("room", "Lobby");
    settings.username = username;
    settings.room = "Lobby";
    socket.emit("login",{username: settings.username, room:settings.room, oauth: localStorage.getItem("auth")});
    window.location = "/bluefire";
  } 

});