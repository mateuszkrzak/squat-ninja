angular.module('szuszApp-admin-profileController', ['ngResource','ui.bootstrap','ngAnimate'])
    .controller('profileController', ['$scope', '$rootScope', '$http', 'users', 'news', 'auth', function ($scope, $rootScope, $http, users, news, auth) {
        $scope.me = auth.currentUser();

        users.get($scope.me.id)
            .success(function(data){
                $scope.tabs = data.tabs;
                console.log($scope.tabs);
            })
            .error(function(){
               $scope.tabs = [];
            });


        $scope.delete = function () {
            $scope.tabs.pop();
            $scope.me.tabs = $scope.tabs;

            users.update($scope.me)
                .success(function (data) {
                    $scope.tabs = data.tabs;
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        $scope.save = function () {
            $scope.me.tabs = $scope.tabs;

            users.update($scope.me)
                .success(function (data) {
                    $scope.tabs = data.tabs;
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        $scope.addTab = function() {
            $scope.tabs.push({
                title: "Zakładka",
                content: "Treść",
                active: true
            });
            $scope.save();
        };

    }]);