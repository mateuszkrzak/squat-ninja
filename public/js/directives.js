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

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) {
                    element.removeClass('ng-hide');
                } else {
                    element.addClass('ng-hide');
                }
            });
        }
    };
}]);

app.directive('szuszLoader', function () {
    return {
        templateUrl: 'views/shared/loader.html',
        restrict: 'E'
    };
});

app.directive('szuszFooter', function () {
    return {
        templateUrl: 'views/shared/footer.html',
        restrict: 'E'
    };
});