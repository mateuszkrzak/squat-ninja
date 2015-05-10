(function(){

    var app = angular.module('szuszApp-adminControllers', ['ngResource','ui.bootstrap']);

    app.controller('NewsController', ['$scope','$http', function ($scope, $http) {
        $scope.news = [];

        $http.get('data/news.json')
            .success(function (data) {
                $scope.news = data;
            })
            .error(function (data, status) {
                console.log(status + data);
            });
        $scope.sort_field = 'news_id';


        $scope.content ='Kliknij aby zacząć pisać swoją wiadomość...';



        $scope.showAddRow = function(){
            $scope.id=getMax($scope.users,"id") +1;
            $scope.role='user';
        };

        $scope.addRow = function(){
            $scope.users.push({ 'id':$scope.id, 'firstname': $scope.firstname, 'lastname': $scope.lastname, 'email': $scope.email, 'role':$scope.role });
            $scope.id='';
            $scope.firstname='';
            $scope.lastname='';
            $scope.email='';
            $scope.role='';
            postUsers();
        };

        $scope.removeRow = function(user_id){
            var index = -1;
            var comArr = eval( $scope.users );
            for( var i = 0; i < comArr.length; i++ ) {
                if( comArr[i].id === user_id ) {
                    index = i;
                    break;
                }
            }
            if( index === -1 ) {
                alert( "Błąd w funkcji removeRow" );
            }
            $scope.users.splice( index, 1 );
        };



    }]); //NewsController




    app.controller('UsersController', ['$scope','$http','$resource', function ($scope, $http, $resource) {
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
            var max;
            for (var i=0 ; i<tab.length ; i++) {
                if (!max || parseInt(tab[i][field]) > parseInt(max[field]))
                    max = tab[i];
            }
            return max[field];
        }

        $scope.showAddRow = function(){
            $scope.id=getMax($scope.users,"id") +1;
            $scope.role='user';
        };

        $scope.addRow = function(){
            $scope.users.push({ 'id':$scope.id, 'firstname': $scope.firstname, 'lastname': $scope.lastname, 'email': $scope.email, 'role':$scope.role });
            $scope.id='';
            $scope.firstname='';
            $scope.lastname='';
            $scope.email='';
            $scope.role='';
            //postUsers();
        };

        $scope.removeRow = function(user_id){
            var index = -1;
            var comArr = eval( $scope.users );
            for( var i = 0; i < comArr.length; i++ ) {
                if( comArr[i].id === user_id ) {
                    index = i;
                    break;
                }
            }
            if( index === -1 ) {
                alert( "Błąd w funkcji removeRow" );
            }
            $scope.users.splice( index, 1 );
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


