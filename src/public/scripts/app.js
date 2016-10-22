
var app = angular.module('trailbreakerApp', ["ng-fusioncharts", "ngRoute"]);

angular.module('regApp', []).factory('storageService', function () {
    var factory = {};
    factory.setMessage = function (msg) {
        return factory.msg;
    }
    factory.getMessage = function () {
        return factory.msg;
    }
    return factory;
}); 