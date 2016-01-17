(function () {
    'use strict';

    angular
        .module('mainApp')
        .factory('students', factory);

    factory.$inject = ['$http', '$rootScope', '$q', '$log'];

    function factory($http, $rootScope,$q,$log) {
        var service = {
            list: getList,
            set: setData,
            get: getData
        };
        service.records = null;
        return service;

        function getList() {
            $log.debug("get Students service");
            $http({
                method: 'GET',
                url: '/api/students'
            }).then(function successCallback(response) {
                service.records = response.data;
                $rootScope.$broadcast('Students_data_updated');
                $log.debug(response.data);
            }, function errorCallback(response) {
                $log.debug("error" + response);
            });
        }

        function getData() {
            $log.debug("get Student  service");
            $http({
                method: 'GET',
                url: '/api/students'
            }).then(function successCallback(response) {
                service.records = response.data;
                $rootScope.$broadcast('Students_data_updated');
                $log.debug(response.data);
            }, function errorCallback(response) {
                $log.debug("error" + response);
            });
        }

        function setData(data) {
            $log.debug("Add Student  service");
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/api/students',
                data: data,
                headers: {
                    "CommandType": "AddStudent"
                }
            }).then(function successCallback(response) {
                $log.debug(response.data);
                service.records.push(data);
                $rootScope.$broadcast('Students_data_updated');
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                $log.debug("error" + response);
                deferred .reject(response);
            });
            return deferred.promise;
        }
    }
})();