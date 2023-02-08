// -----------------------------------------------------------------------
parking.controller('parkingCtrl', function($scope, cars, parkingService, searchService,parkingHttpFacade) {
    $scope.colors = ["White",  "Black", "Brown", "Blue", "Green", "Red", "Pink"];
    
    // resolve promises data
    $scope.cars = cars.data.data.cars;  // replace with retrivcare 

    $scope.parkCar = function (car){
        car.entrance = new Date();

        parkingHttpFacade.saveCar(car)          // calling http method by function 
            .then(function(data, status, headers, config){
                retrieveCars();
                delete $scope.car;
                $scope.message = "The car was parked successfully!";
            })
            .catch(function(data, status, header, config){
                switch(status) {
                    case 401: {
                        $scope.message = "You must be authenticated!";
                        break;
                    }
                    case 500: {
                        $scope.message = "Something went wrong!";
                        break;
                    }
                }
                console.log(data, status);
            });
    };

    var retrieveCars = function () {
        parkingHttpFacade.getCars()
        .then(function(data, status, headers, config){
            $scope.cars = data.data.data.cars;
        })
        .catch(function(data, status, headers, config) {
            switch(status) {
                case 401: {
                    $scope.message = "You must be authenticated!"
                    break;
                }
                case 500: {
                    $scope.message = "Something went wrong!";
                    break;
                }
            }
        });
    };

    $scope.calculateTicket = car => {
        $scope.pa = 1;
        $scope.ticket = parkingService.calculateTicket(car);
    };
// -----------------------------------
    // USING $q SERVICE
    $scope.filterCars = function (criteria) {
        searchService.filter($scope.cars, criteria)
            .then(function(result){
            $scope.searchResults = result;
        })
        .catch(function (message){
            $scope.message = message;
        });
    };

    // $scope.plateCounter = -1;
    $scope.plateCounter = 0;
    $scope.$watch("car.plate", function(newValue, oldValue){
        if(newValue == oldValue) return;
        $scope.plateCounter++;
    });

    // listen to broadcast method
    let listenToTick = function(){
        $scope.$on('TICK', function(event, tick){
            $scope.tick = tick;
            // console.log(tick)
        });
    };
    listenToTick();

    // to stop the tick  function 
    $scope.stopTicking = function(){
        $scope.$emit("STOP_TICK");
    };
});
