
'use strict';
angular.module("mainApp")         
    .controller('addStudentController', function ($scope, $http, students, $rootScope, $location, reCAPTCHA,$log) {
        $scope.AgeRange = $.map($(Array(25)), function (val, i) { return i; })
             
        $scope.AddStudent = function () {
            $log.debug("AddStudent");
            $log.error(" AddStudent ");
            var student = {
                FirstName : $scope.FirstName,
                LastName: $scope.LastName,
                Age: $scope.Age
            }
            var promise = students.set(student);
            promise.then(function (data) {
                $log.debug("differe returned with value " + data);
                $location.path('/viewStudents');
            }, function (reason) {
                $log.error("error" + reason);
            });
        }
        // or you can also set key here
        reCAPTCHA.setPublicKey('6LetUhUTAAAAAPcW4eKZtSkCbHMbwWxsw7y8uaKL');

        $scope.register = function () {
            if ($scope.myForm.$valid) {
                $scope.showdialog = true;                
                $log.debug("'Form is valid " );
            }
        }    
    })