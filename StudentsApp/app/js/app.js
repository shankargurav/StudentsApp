
'use strict';
angular.module("mainApp", ['ngRoute', 'AdalAngular', 'ngAnimate', 'ui.bootstrap', 'ngMessages', 'reCAPTCHA'])
    .value('clientId', 'a12345654321x')
    .config(['$routeProvider', '$httpProvider', '$locationProvider', 'adalAuthenticationServiceProvider', 'reCAPTCHAProvider', '$provide', '$logProvider', 'appConfigProvider',
        function ($routeProvider, $httpProvider, $locationProvider, adalProvider, reCAPTCHAProvider, $provide, $logProvider, appConfigProvider) {
            $logProvider.debugEnabled(appConfigProvider.debug);
            $routeProvider.
                when("/home", {
                    templateUrl: 'App/html/home.htm',
                    controller: 'homeController'
                }).

                when('/addStudent', {
                    templateUrl: 'App/html/addStudent.htm',
                    controller: 'addStudentController',
                    requireADLogin: true
                }).

                when('/viewStudents', {
                    templateUrl: 'App/html/viewStudents.htm',
                    controller: 'viewStudentsController',
                    requireADLogin: true,
                    resolve: {
                        studentsData: function (students) {
                            return students.get(); // I renamed the loading function for clarity
                        }
                    }
                }).

                when('/userInfo', {
                    templateUrl: 'App/html/userInfo.htm',
                    requireADLogin: true
                })

            $locationProvider.html5Mode(true).hashPrefix('!');

            adalProvider.init(
            {
                instance: 'https://login.microsoftonline.com/',
                tenant: 'shankarguravlive.onmicrosoft.com',
                clientId: 'e26da9bc-bc7e-42d1-bb2e-d9b768536f79',
                extraQueryParameter: 'nux=1',
                //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
            },
            $httpProvider
            );

            // required, please use your own key :)
            reCAPTCHAProvider.setPublicKey('6LetUhUTAAAAAPcW4eKZtSkCbHMbwWxsw7y8uaKL');

            // optional
            reCAPTCHAProvider.setOptions({
                theme: 'clean'
            });

            $provide.decorator('$log', ['$delegate', 'appConfig', function ($delegate, appConfig) {
                // Keep track of the original debug method, we'll need it later.
                var origDebug = $delegate.debug;
                /*
                 * Intercept the call to $log.debug() so we can add on 
                 * our enhancement. We're going to add on a date and 
                 * time stamp to the message that will be logged.
                 */
                $delegate.debug = showLogs;
                function showLogs() {
                    var args = [].slice.call(arguments);
                    args[0] = [appConfig.appName, new Date().toString(), ': ', JSON.stringify(args[0], null, 4)].join('');

                    // Send on our enhanced message to the original debug method.
                    origDebug.apply(null, args)
                };

                return $delegate;
            }]);
        }]);



