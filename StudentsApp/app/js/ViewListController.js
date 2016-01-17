(function () {
    'use strict';
    angular
    .module('mainApp')
    .controller('viewStudentsController', function ($scope, students) {
        $scope.students = students.records;       
    });
})();