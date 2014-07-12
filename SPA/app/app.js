/**
 * @ngdoc overview
 * @name Overview
 *
 * @description For a conceptional version check the README.md file in this project. This script (app.js) is the main file that starts off the whole Single Page Application.
    The Html file (RelayrDashboard.html) is the main single page that will nests all dynamic views. The html file also imports all of the scripts needed in order.

*/


var app = angular.module('sugahack', [
  'ngRoute',
  'ngResource'
]);



app.constant("settings", {
    username:"",
    room:"",
});


app.run(function ($http, $location, settings) {

});


app.config(function ($routeProvider, $locationProvider,settings) {

    $locationProvider.html5Mode(true);

    var config = function(templateUrl){
        if (!settings.username){
            return templateUrl;
            //return "/app/views/login.html";
        }else{
            return templateUrl;
        }
        
    }

    $routeProvider
        .when('/', {templateUrl:config('/app/views/login.html')})
        .when('/dashboard', {templateUrl:config('/app/views/dashboard.html')})




        .otherwise({ redirectTo: '/' });
});




