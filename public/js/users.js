angular.module('szuszApp-usersController', ['ngResource','ui.bootstrap'])
.controller('UsersController', ['$scope','$http', 'users', function ($scope, $http, users) {
    $scope.users = [];
    getUsers();

    function getUsers() {
        users.getAll()
            .success(function (users) {
                $scope.users = users;
            })
            .error(function (error) {
                console.log(error);
            });
    }

    $scope.updateUser = function (id) {
        users.update(id)
            .success(function () {
            })
            .error(function(data) {
                console.log(data);
            });
    };

    $scope.deleteUser = function (id) {
        users.delete(id)
            .success(function () {
                for (var i = 0; i < $scope.users.length; i++) {
                    var user = $scope.users[i];
                    if (user.id === id) {
                        $scope.users.splice(i, 1);
                        break;
                    }
                }
            })
            .error(function (error) {
                console.log(error);
            });
    };




    $scope.delete = function(id){
        $scope.deleteUser(id);
    };

    $scope.editingData = [];

    for (var i = 0, length = $scope.users.length; i < length; i++) {
        $scope.editingData[$scope.users[i].id] = false;
    }
    $scope.modify = function(field){
        $scope.editingData[field.id] = true;
    };

    $scope.update = function(field){
        $scope.updateUser(field);
        $scope.editingData[field.id] = false;
    };



    $scope.itemsPerPage = 15;
    $scope.currentPage = 1;

    $scope.paginate = function(value) {
        $scope.totalItems = $scope.users.length;

        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
        end = begin + $scope.itemsPerPage;
        index = $scope.users.indexOf(value);
        return (begin <= index && index < end);
    };

    $scope.sort_field = 'username';

}]); //UsersController
