var search = angular.module('search', []);

// Timeout - function 
search.factory('searchService', function ($timeout, $q) {
    // using deferred API 
    var _filter = function(cars, criteria){
        var deferred = $q.defer();
        $timeout(function(){
            var result = []; 
            angular.forEach(cars, function(car){
                if(_matches(car, criteria)){
                    result.push(car);
                }
            });
            if(result.length > 0) {
                deferred.resolve(result);
            } else {
                deferred.reject("No result were found!");
            }
        }, 1000);
        return deferred.promise;
    };

    var _matches = function (car, criteria) {
        return angular.toJson(car).indexOf(criteria)>0;
    };

    return {
        filter: _filter
    }
});
