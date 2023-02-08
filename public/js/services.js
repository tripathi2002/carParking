//-----------------------------------------------------------------
// CREATING AN HTTP FACADE 
parking.factory("parkingHttpFacade", ($http)=>{
    var _getCars = ()=>{
        return $http.get("/cars");
    };

    var _getCar = (id)=>{
        console.log(id)
        return $http.get("/cars/" + id);
    };

    var _saveCar = function(car){
        return $http.post("/cars", car);
    }

    var _updateCar = (car)=>{
        return $http.put("/cars" + car.id, car);
    };

    var _deleteCar = (id)=>{
        return $http.delete("/cars/" + id);
    };

    return {
        getCars: _getCars,
        getCar: _getCar,
        saveCar: _saveCar,
        updateCar: _updateCar,
        deleteCar: _deleteCar
    };
});

// --------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------
parking.factory("tickGenerator", function($rootScope, $timeout){
    var _tickTimeout; 

    var _start = function(){
        _tick();
    };

    var _tick = function(){
        $rootScope.$broadcast("TICK", new Date());
        _tickTimeout = $timeout(_tick, 1000);
    };

    var _stop = function (){
        $timeout.cancel(_tickTimeout);
    }; 

    var _listenToStop = function(){
        $rootScope.$on("STOP_TICK", function(event, data){
            _stop();
        });
    };
    _listenToStop();

    return {
        start: _start,
        stop: _stop
    };
});