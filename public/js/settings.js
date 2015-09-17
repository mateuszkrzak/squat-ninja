angular.module('szuszApp-settingsController', ['ngResource','ui.bootstrap','ngAnimate'])
    .controller('settingsController', ['$scope', '$http','pages', '$modal', function ($scope, $http, pages, $modal) {
        $scope.content = "Kliknij tutaj aby zacząć pisać"
        $scope.type = "panel";

        pages.getAll()
            .success(function(data){
                $scope.pages = data;
            })
            .error(function(){
                $scope.pages = [];
            });

        $scope.editPage = function (size, page) {
            var modalInstance = $modal.open({
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
            pages.delete(id)
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
                    alert( "Błąd " + status);
                });
        };




        $scope.addElement = function(){
            pages.insert({'type': $scope.type,'content': $scope.content})
                .success(function (data) {
                    $scope.pages.push(data);
                })
                .error(function(data,status) {
                });

        };
    }]);