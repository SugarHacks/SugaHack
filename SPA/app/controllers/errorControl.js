/**
 * @ngdoc controller
 * @requires $scope
 * @name Error Controller
 * @description This is a basic error controller. It listens for an 'error'broadcast done by other controllers which depend on error controlling. Each function needs to have $rootScope in order to broadcast an error this controller.
 *
 * ## 
 */
app.controller('errorController', function ($scope) {
	$scope.showError = function(err){
		$scope.title="Error " + err.status;
		$scope.msg=err.data.message;
		if (!err){
			err = "There is no error message.";
		}
		$(".errorControl").addClass("show");

	}	

	$scope.close = function($event){

		$(".errorControl").removeClass("show");

	}
    $scope.$on("error", function (event, err) {
    	$scope.showError(err);
    });
});