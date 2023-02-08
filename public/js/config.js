parking.config(function (parkingServiceProvider) {
    parkingServiceProvider.setParkingRate(10);
});

// now resolving the promises
parking.config(function($routeProvider){
    $routeProvider
        .when('/parking', {
        // { template: "<h2>Hello, you are in parking</h2>"})
            templateUrl: "/views/parking.html",
            controller: "parkingCtrl",
            resolve: {
                "cars": function (parkingHttpFacade){
                    return parkingHttpFacade.getCars();
                }
            }
        })
        .when("/car/:id", {
            templateUrl: "/views/car.html",
            controller: "carCtrl",
            resolve: {
                "car": function (parkingHttpFacade, $route){
                    let id = $route.current.params.id;
                    return parkingHttpFacade.getCar(id);
                }
            }
        })
        .when('/faq', {
            templateUrl: "/views/faq.html",
            controller: "faqCtrl"
        })
        .when('/login', {
            templateUrl: "/views/login.html"
        })
        .otherwise({
            redirectTo:'/parking'
        });
})