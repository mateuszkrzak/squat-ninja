angular.module('szuszApp-settingsController', ['ngResource','ui.bootstrap','ngAnimate'])
    .controller('settingsController', ['$scope', '$http', 'users', 'pages', 'auth','$modal', function ($scope,  $http, users, pages, auth, $modal) {

        pages.getAll()
            .success(function(data){
                $scope.pages = data;

            })
            .error(function(){
                $scope.pages = [];
            });



        $scope.editPage = function (size, page) {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                backdrop: true,
                size: size,
                templateUrl: 'views/page-edit-modal.html',
                controller: function($scope, $modalInstance){
                    $scope.content = page.content;

                    $scope.save = function () {
                        page.content = $scope.content;
                        $modalInstance.close(page);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });

            modalInstance.result.then(function (result) {
                $scope.updatePage(result);
            }, function () {
            });
        };

        $scope.updatePage = function (id) {
            pages.update(id)
                .success(function () {
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        $scope.delete = function(id){
            $scope.deletePage(id);
        };

        $scope.deletePage = function (id) {
            page.delete(id)
                .success(function () {
                    for (var i = 0; i < $scope.pages.length; i++) {
                        var page = $scope.pages[i];
                        if (page.id === id) {
                            $scope.pages.splice(i, 1);
                            break;
                        }
                    }
                })
                .error(function(data,status) {
                    alert( "B³¹d " + status);
                });
        };
    }]);