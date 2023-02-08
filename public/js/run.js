/* parking.run(function ($http) {
    $http.defaults.headers.common.Accept = "application/json";
    $http.defaults.cache = true;        // for caching same data
   }); */

parking.run(function($rootScope, tickGenerator){
    $rootScope.appTitle = "Parking";  // $rootScope object  

    $rootScope.$on("$routeChangeStart", function(event, current, previous, rejection){
        $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function(event, current, previous, rejection){
        $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
        $window.location.href = "./views/error.html";
    });

    tickGenerator.start();
}); 


