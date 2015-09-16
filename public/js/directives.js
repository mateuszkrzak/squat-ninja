var app = angular.module('szuszApp-directives',[]);

app.directive('szuszHeader', function (auth, $location) {
    return {
        templateUrl: 'views/header.html',
        restrict: 'E',
        link: function (scope,elem, attrs) {

            scope.logout = function () {
                auth.logout(function () {
                    $location.path("/login");
                  }, function (err)
                {
                    console.log(err);
                });
            }


            scope.$on("$routeChangeSuccess", function (event, current, previous) {
                scope.isLogged = auth.isLogged();
                scope.user = auth.currentUser();
                scope.isAdmin = auth.isAdmin();
            });

        }
    };
});

app.directive('szuszFooter', function () {
    return {
        templateUrl: 'views/footer.html',
        restrict: 'E',
        link: function (scope,elem, attrs) {

        }
    };
});