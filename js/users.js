(function(){

    var app = angular.module('szuszApp-admin-usersController', ['ngResource','ui.bootstrap']);

    app.controller('UsersController', ['$scope','$http', function ($scope, $http) {
        $scope.users = [];

        $http.get('data/users.json')
            .success(function (data) {
                $scope.users = data;
            })
            .error(function (data, status) {
                console.log(status + data);
            });


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


        $scope.sort_field = 'id';



        function postUsers(){
            $http.post('data/users.json', $scope.users)
                .success(function(data) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });

            $http({
                method: "post",
                url:'data/users.json',
                data: $scope.users,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

        }

        function getMax(tab, field) {//zwraca max z tab pola field
            return Math.max.apply(null, tab.map(function (obj) {
                return obj[field];
            }));
        }

        $scope.showAddRow = function(){
            $scope.id=getMax($scope.users,"id") +1;
            $scope.role='user';
        };

        $scope.addRow = function(){
            $scope.users.push({ 'id':$scope.id, 'degree': $scope.degree, 'firstname': $scope.firstname, 'lastname': $scope.lastname, 'email': $scope.email, 'role':$scope.role });
            $scope.id='';
            $scope.degree='';
            $scope.firstname='';
            $scope.lastname='';
            $scope.email='';
            $scope.role='';
            //postUsers();
        };

        $scope.removeRow = function($index){
            $scope.users.splice($index, 1 );
        };

        $scope.editingData = [];

        for (var i = 0, length = $scope.users.length; i < length; i++) {
            $scope.editingData[$scope.users[i].id] = false;
        }
        $scope.modify = function(field){
            $scope.editingData[field.id] = true;
        };
        $scope.update = function(field){
            $scope.editingData[field.id] = false;
        };


    }]); //UsersController

})();


