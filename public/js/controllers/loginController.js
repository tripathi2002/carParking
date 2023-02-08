parking.controller("loginCtrl", function($scope, loginService){
    // $scope.login = function(){
    $scope.login = function(user){
        // console.log(user)
        // loginService.login($scope.username, $scope.password);
        // loginService.login($scope);
        loginService.login(user);

        // $scope.login = loginService.login(user);

    }
    // console.log(user)
});