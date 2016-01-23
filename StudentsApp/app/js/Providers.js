(function () {
    'use strict';
    angular
    .module('mainApp')
    .provider('appConfig', [function () {
        this.debug = false;
        this.appName = "StudentApp";
        this.debugEnabled = function (isDebugOn) {
            this.debug = !!isDebugOn;
        };

        this.$get = [function () {
            return new AppConfig(this.debug, this.appName);
        }];
    }]);

    function AppConfig(debug,appName) {
        this.debug = debug;
        this.appName = appName;
    }

})();