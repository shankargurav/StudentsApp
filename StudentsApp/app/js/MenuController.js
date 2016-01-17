(function () {
    'use strict';
    angular
    .module('mainApp')
    .controller('menuUpdate', function ($scope, students, appConfig) {
        if (!students.records) {
            students.get();
        }
        else
            $scope.RecordCount = students.records.length;
        $scope.$on('Students_data_updated', function (event) {
            var data = students.records;
            $scope.RecordCount = data.length;
        });


    });
})();