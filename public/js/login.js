angular.module('szuszApp-loginController', ['ngResource','ui.bootstrap','ngCookies','ngAnimate'])
    .controller('LoginController', ['$scope', '$rootScope','$http', '$location', 'auth', function ($scope, $rootScope ,$http, $location, auth) {

        $scope.login = function () {
            if (!$scope.user || !$scope.user.username || !$scope.user.password) {
                $scope.error = "Uzupełnij wszystkie pola formularza.";
                return;
            }
            else{
                var user ={
                    username: $scope.user.username,
                    password: $scope.user.password
                };
            }

            auth.login(user, function (result) {
                $location.path("/");
            }, function (err) {
                if (err.status==401) $scope.error = "Podałeś błędne dane.";
            })
        }

}]);