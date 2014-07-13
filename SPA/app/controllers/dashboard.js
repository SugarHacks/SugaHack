app.controller('dashboardController', function($scope,$timeout, $rootScope,settings, user, glucose) {
  $(document).ready(function(){
    $timeout(function(){
      
    },100);
  });

	var myUser = user.getUser().get({userEmail:"testy@testify.com"}, function(){
		console.log(myUser)
	});  

	$scope.logbook = glucose.getLevels().query({userEmail:"testy@testify.com","latest":100}, function(){
		$scope.isReady= true;
	});




  $scope.glucoseMeasure= function(log){

  	var glucose = parseInt(log.glucose);

  	if (glucose  >=  0 &&  glucose <= 60 ){
  		return "bad"
  	}
  	
  	if (glucose  >=  60 &&  glucose <= 80 ){
  		return "okay"
  	}
  	
  	if (glucose  >=  80 &&  glucose <= 140 ){
  		return "good"
  	} 

  	if (glucose  >=  140 &&  glucose <= 180 ){
  		return "ok"
  	}  

  	if (glucose  >=  180 &&  glucose <= 250 ){
  		return "bad"
  	}

  	if (glucose  >=  250 ){
  		return "verybad"
  	}
  	
  };


 

});
