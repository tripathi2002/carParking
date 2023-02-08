parking.controller('carCtrl', function($scope, car, $routeParams, $location, $window, parkingHttpFacade, parkingService){
    // console.log("Hell")
    $scope.depart = function (car) {
        parkingHttpFacade.deleteCar(car.id)
            .then(function (data, status) {
                $location.path("/parking");
            })
            .catch(function (err, status) {
                $scope.message = "Something went wrong!";
                // $window.location.href = "error.html";
            });
    };

    // replacing retrieve function with resolve in the config
    $scope.car = car.data.data.car;
   
})