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