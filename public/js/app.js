(function(){
    var app = angular.module('szuszApp',
        [   'ngRoute',
            'ngResource',
            'ngAnimate',
            'szuszApp-usersController',
            'szuszApp-newsController',
            'szuszApp-loginController',
            'szuszApp-registerController',
            'szuszApp-profileController',
            'szuszApp-settingsController',
            'szuszApp-homeController',
            'szuszApp-aboutController',
            'szuszApp-peopleController',
            'szuszApp-services',
            'szuszApp-filters',
            'szuszApp-directives',
            'textAngular',
            'ui.bootstrap'
        ]);

    app.config(['$routeProvider', '$locationProvider','$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;

        $routeProvider
            .when('/news', {
                controller: 'NewsController',
                templateUrl: 'views/admin/news.html',
                user: true
            })
            .when('/users', {
                controller: 'UsersController',
                templateUrl: 'views/admin/users.html',
                user: false,
                admin: true
            })
            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'views/admin/profile.html',
                user: true
            })
            .when('/settings', {
                controller: 'SettingsController',
                templateUrl: 'views/admin/settings.html',
                user: false,
                admin: true
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/public/login.html'
            })
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'views/public/register.html'
            })
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'views/public/home.html'
            })
            .when('/people', {
                controller: 'PeopleController',
                templateUrl: 'views/public/people.html'
            })
            .when('/people/:personId', {
                controller: 'PeopleController',
                templateUrl: 'views/public/people-detail.html'
            })
            .when('/about', {
                controller: 'AboutController',
                templateUrl: 'views/public/about.html'
            })
            .otherwise({
                redirectTo: '/home'
            })
        ;

        //$locationProvider.html5Mode(true);


    }]);

    app.run(function ($rootScope, $location, auth) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var loginPath = '/login';
            if (next.user && !auth.isLogged()) {
                $location.path('/');
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