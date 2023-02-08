var ui = angular.module('ui', []);

ui.directive("accordionItem", ()=> {
    return {
        templateUrl: "views/accordionItem.html",
        restrict: "E",
        scope: {
            title: "@"
        },
        transclude: true,
        require: "^accordion",
        link: (scope, element, attrs, ctrl, transcludeFn) => {
            ctrl.addAccordionItem(scope);
            element.bind("click", ()=> {
                ctrl.closeAll();
                scope.$apply(()=> {
                    scope.active = !scope.active;
                });
            });
        }
    };
});

ui.directive("accordion", ()=> {
    return {
        template: "<div ng-transclude></div>",
        restrict: "E",
        transclude: true,
        controller: function($scope, $element, $attrs, $transclude) {
            var accordionItens = [];

            var addAccordionItem = function (accordionScope) {
                accordionItens.push(accordionScope);
            };

            var closeAll = () => {
                angular.forEach(accordionItens, (accordionScope) => {
                    accordionScope.active = false;
                });
            };

            return {
                addAccordionItem: addAccordionItem,
                closeAll: closeAll
            };
        }
    }
});
// ---------------

ui.directive("alert", function(){
    return {
        restrict: 'E',
        scope: {
            topic: '@'
        },
        replace: true,
        transclude: true,
        template: 
            "<div class='alert'>" + 
                "<span class='alert-topic'>" +
                    "{{topic}}" + 
                "</span><br>" + 
                "<span class='alert-description' ng-transclude> " + 
                "</span>" + 
            "</div>"
    };
});