(function () {
    'use strict';
    angular
    .module('mainApp')
    .controller('homeController', ['$scope', 'adalAuthenticationService', '$location','$log', function ($scope, adalService, $location, $log) {
        $scope.path = $location.path();
        $scope.login = function () {
            adalService.login();
        };
        $scope.logout = function () {
            adalService.logOut();
            $log.debug("User logged out ");
        };
        $scope.isActive = function (viewLocation) {
            return viewLocation === path;
        };
        $scope.change = function () {
            $log.debug("file changed");
        };
        $scope.upload = function () {
             //do something with the file        
            $log.debug($scope.file.size);
        };
    }])
    .directive('fileChange', fileChange);


    function fileChange() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                fileChange: '&'
            },
            link: function link(scope, element, attrs, ctrl) {
                element.on('change', onChange);

                scope.$on('destroy', function () {
                    element.off('change', onChange);
                });

                function onChange() {
                    ctrl.$setViewValue(element[0].files[0]);
                    scope.fileChange();
                }
            }
        };
    }

})();