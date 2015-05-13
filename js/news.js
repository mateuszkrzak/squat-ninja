(function(){

    var app = angular.module('szuszApp-admin-newsController', ['ngResource','ui.bootstrap']);


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

        $scope.editNews = function (size, message, $index) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                backdrop: true,
                templateUrl: 'views/admin/news-edit-modal.html',
                controller: function($scope, $modalInstance){
                    $scope.news_id= message.news_id;
                    $scope.content = message.content;
                    $scope.firstname = message.firstname;
                    $scope.lastname = message.lastname;
                    $scope.author_id = message.author_id;
                    $scope.news_date = message.news_date;

                    $scope.save = function () {
                        message = $scope.content;
                        $modalInstance.close($scope.content);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },

                size: size,
                resolve: {
                    content: function () {
                        return $scope.content;
                    }
                }

            });

            modalInstance.result.then(function (message) {
                $scope.news[$index].content = message;
            }, function () {
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
            return Math.max.apply(null, tab.map(function (obj) {
                	                return obj[field];
                	            }));
        }

    }]); //NewsController

})();


