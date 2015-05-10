(function(){

    var app = angular.module('szuszApp-admin', ['ngRoute', 'ngResource', 'szuszApp-adminControllers','textAngular','ui.bootstrap']);



    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/admin/dash.html',
                label: 'Zaloguj'
            })
            .when('/news', {
                controller: 'NewsController',
                templateUrl: 'views/admin/news.html',
                label: 'Newsy'
            })
            .when('/users', {
                controller: 'UsersController',
                templateUrl: 'views/admin/users.html',
                label: 'Użytkownicy'
            })
            .when('/profile', {
                templateUrl: 'views/admin/profile.html',
                label: 'Moja strona'
            })
            .otherwise({
                redirectTo: '/news'
            })
        ;

        $locationProvider.html5Mode({
        //    enabled: true,
            requireBase: false
        });

    }]);




})();


