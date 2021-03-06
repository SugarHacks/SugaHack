﻿/**
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
    baseAddress:"http://audun.io:1024",
    token:"",
    appId:"AQbfahAS3C8yTIWSmM2O06RK-JOg_0oIyTQO9iFFTD_htEygu5dWjkkqGWq6"
});


app.run(function ($http, $location, settings, user) {

    var token = localStorage.getItem('clientToken');
    settings.embed ={};
    function parse(input){
        console.log(input);
        var token = input.split("code=")[1];
 
        return token;
    }


    function getToken(){
        return parse($location.$$absUrl);
    }

    switch($location.path()){

        case "/scrape":

            //$http.defaults.headers.common['Authorization'] = 'Bearer '+ getToken();
            //localStorage.setItem("clientToken",getToken());
            localStorage.setItem("authCode",getToken());
            settings.authCode = getToken();
            window.opener.location = "/dashboard";
            window.close();

            break;

        case "/logout":
            localStorage.removeItem("clientToken");
            settings.token= undefined;
            window.location = "/";
            break;


        default:
            var token = localStorage.getItem("clientToken");
            var authCode = localStorage.getItem("authCode");
            var getToken = user.getToken();

            getToken.save({code:authCode}, function(){
                

              }, function(error) {
                
            });
            if (token !== null && token.length > 0 ){
                //$http.defaults.headers.common['Authorization'] = 'Bearer '+ token;
                localStorage.setItem("clientToken",token);
                settings.token =token;
            }
        break;
    }
});


app.config(function ($routeProvider,$httpProvider, $locationProvider,settings) {
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




