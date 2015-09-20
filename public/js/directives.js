var app = angular.module('szuszApp-directives',[]);

app.directive('szuszHeader', ['auth','$location','pages', function (auth, $location, pages) {

    return {
        templateUrl: 'views/shared/header.html',
        restrict: 'E',
        controller: function($scope){
            pages.getAll()
                .success(function (pages) {
                    angular.forEach(pages,function(value){
                        if(value.type=='header'){
                            $scope.sitename = value.content;

                        }
                    });
                });
        },
        link: function (scope,elem, attrs) {
            scope.logout = function () {
                auth.logout(function () {
                    $location.path("/login");
                  }, function (err) {
                    console.log(err);
                     });
            };
            scope.$on("$routeChangeSuccess", function () {
                scope.isLogged = auth.isLogged();
                scope.user = auth.currentUser();
                scope.isAdmin = auth.isAdmin();
                scope.isModerator = auth.isModerator();
            });
        }
    };
}]);

app.directive('szuszFooter', function () {
    return {
        templateUrl: 'views/shared/footer.html',
        restrict: 'E',
        link: function (scope,elem, attrs) {

        }
    };
});