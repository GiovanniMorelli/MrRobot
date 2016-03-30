var mrRobot = angular.module('mrRobot',['ngRoute',
    'ngMessages',
    'ngMaterial',
    'ngMdIcons']);

mrRobot.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/homePageMrRobot', {
            templateUrl: '/robotPage'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);
