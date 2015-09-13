(function(){
    var app = angular.module('szuszApp-admin',
        [   'ngRoute',
            'ngResource',
            'ngAnimate',
            'szuszApp-admin-usersController',
            'szuszApp-admin-newsController',
            'szuszApp-admin-loginController',
            'szuszApp-admin-profileController',
            'szuszApp-admin-services',
            'szuszApp-admin-directives',
            'textAngular',
            'ui.bootstrap'
        ]);

    app.config(['$routeProvider', '$locationProvider','$httpProvider', function($routeProvider, $locationProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;

        $routeProvider
            .when('/news', {
                controller: 'NewsController',
                templateUrl: 'views/news.html',
                user: true
            })
            .when('/users', {
                controller: 'UsersController',
                templateUrl: 'views/users.html',
                user: false,
                admin: true
            })
            .when('/profile', {
                controller: 'profileController',
                templateUrl: 'views/profile.html',
                user: true
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/login.html',
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

    app.run(function ($rootScope, $location, auth) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var loginPath = '/login';
            if (next.user && !auth.isLogged()) {
                $location.path(loginPath);
            } // jesli nie zalogowany przenies na strone logowania

            if (next.admin && !auth.isAdmin()) {
                $location.path('/');
            } // jesli nie admin to przenies do /

            if ($location.path()==loginPath && auth.isLogged()) {
                $location.path('/');
            } //nie pokazuj strony logowania zalogowanym
        });
    });

})();