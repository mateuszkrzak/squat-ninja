(function(){

    var app = angular.module('szuszApp', ['ngRoute']);


    app.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/news', {
                templateUrl: 'views/news.html',
                label: 'Newsy'
            })
            .when('/members', {
                templateUrl: 'views/members-list.html',
                label: 'Lista użytkowników'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                label: 'O nas'
            })
            .when('/member-info', {
                templateUrl: 'views/member-details.html',
                label: 'Panel użytkownika'
            })
            .otherwise({
                redirectTo: '/news'
            })
        ;

    }]);

})();