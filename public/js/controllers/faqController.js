parking.controller('faqCtrl', function ($scope) {
    $scope.faq = false;
    $scope.openFAQ = function () {
    $scope.faq = true;
    }
    $scope.closeFAQ = function () {
    $scope.faq = false;
    }
   });