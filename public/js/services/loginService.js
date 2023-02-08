parking.factory("loginService", function ($http){
    /* var _login = function($scope){
        var user = {
            username: $scope.username,
            password: $scope.password
        };
        return $http.post('/login', user);
    }; */

    var _login = function(user){
        console.log(user);
        return $http.post('/login', user);
    };
    return {
        login: _login 
    };
});