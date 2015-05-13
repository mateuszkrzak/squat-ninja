(function(){

    var app = angular.module('szuszApp-adminControllers', ['ngResource','ui.bootstrap']);


    app.controller('NewsController', ['$scope','$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
        $scope.news = [];

        $http.get('data/news.json')
            .success(function (data) {
                $scope.news = data;
            })
            .error(function (data, status) {
                console.log(status + data);
            });
        $scope.sort_field = 'news_id';

        //paginacja
        $scope.itemsPerPage = 15;
        $scope.currentPage = 1;

        $scope.paginate = function(value) {
            $scope.totalItems = $scope.news.length;

            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
            end = begin + $scope.itemsPerPage;
            index = $scope.news.indexOf(value);
            return (begin <= index && index < end);
        };

        $scope.content ='Kliknij aby zacząć pisać swoją wiadomość...';


        $scope.animationsEnabled = true;

        $scope.editNews = function (size, message) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/admin/news-edit-modal.html',
                controller: function($scope, $modalInstance){

                    $scope.save = function () {
                        message = $scope.content;
                        $modalInstance.close($scope.content);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.news_id= message.news_id;
                    $scope.content = message.content;
                    $scope.firstname = message.firstname;
                    $scope.lastname = message.lastname;
                    $scope.author_id = message.author_id;
                    $scope.news_date = message.news_date;
                },
                size: size

            });

            modalInstance.result.then(function (message) {
                console.log(message);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        $scope.addNews = function(){
            $scope.news_id = getMax($scope.news,"news_id")+1;
            $scope.news_date = new Date();

            $scope.news.push({
                'news_id':$scope.news_id,
                'content': $scope.content,
                'firstname': $scope.firstname,
                'lastname': $scope.lastname,
                'author_id': $scope.author_id,
                'news_date':$scope.news_date
            });
            $scope.news_id='';
            $scope.content='';
            $scope.firstname='';
            $scope.lastname='';
            $scope.author_id='';
            $scope.news_date='';
            //postUsers();
        };

        $scope.removeNews = function(news_id){
            var index = -1;
            var comArr = eval( $scope.news );
            for( var i = 0; i < comArr.length; i++ ) {
                if( comArr[i].news_id === news_id ) {
                    index = i;
                    break;
                }
            }
            if( index === -1 ) {
                alert( "Błąd w funkcji removeRow" );
            }
            $scope.news.splice( index, 1 );
        };

        function getMax(tab, field) {//zwraca max z tab pola field
            var max;
            for (var i=0 ; i<tab.length ; i++) {
                if (!max || parseInt(tab[i][field]) > parseInt(max[field]))
                    max = tab[i];
            }
            return max[field];
        }

    }]); //NewsController

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


