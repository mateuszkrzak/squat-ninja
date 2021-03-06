angular.module('szuszApp-newsController', ['ngResource','ui.bootstrap','ngAnimate'])
.controller('NewsController', ['$scope','$http', '$modal', 'users', 'news', 'auth', function ($scope, $http, $modal, users, news,auth) {
    $scope.news = [];
    $scope.title = 'Tytuł';
    $scope.content ='Kliknij aby zacząć pisać swoją wiadomość...';
    getNews();


    function getNews() {
        news.getAll()
            .success(function (news) {
                $scope.news = news;
                angular.forEach($scope.news, function(value, key) {
                    users.get($scope.news[key].author)
                         .success( function(user){
                            value.authorfull = user.firstname + " " + user.lastname;
                        }
                     );
                });
            })
            .error(function (data, error) {
                console.log(data + "\n" + error);
            });
    }

    $scope.insertNews = function () {
        newNews = {
            'title' : $scope.title,
            'content': $scope.content,
            'author': auth.currentUser().id
        };
        news.insert(newNews)
            .success(function (data) {
                users.get(data.author)
                    .success( function(user){
                        data.authorfull = user.firstname + " " + user.lastname;
                    }
                );
                $scope.news.push(data);
            })
            .error(function(data,status) {
            });
    };

    $scope.updateNews = function (id) {
        news.update(id)
            .success(function () {
            })
            .error(function(data) {
                console.log(data);
            });
    };

    $scope.deleteNews = function (id) {
        news.delete(id)
            .success(function () {
                for (var i = 0; i < $scope.news.length; i++) {
                    var singlenews = $scope.news[i];
                    if (singlenews.id === id) {
                        $scope.news.splice(i, 1);
                        break;
                    }
                }
            })
            .error(function(data,status) {
                errorMsg = "";
                angular.forEach(data.errors, function(value, key) {
                    errorMsg += key + " " + value +"\n";
                });

                alert( "Błąd " + status + ":\n" + errorMsg);
            });
    };

    $scope.editNews = function (size, message) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            size: size,
            templateUrl: 'views/admin/news-edit-modal.html',
            controller: function($scope, $modalInstance){
                $scope.content = message.content;
                $scope.title = message.title;
                $scope.author = message.authorfull;
                $scope.date = message.date;
                $scope.id = message.id;

                $scope.save = function () {
                    message.content = $scope.content;
                    message.title = $scope.title;
                    $modalInstance.close(message);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }

        });

        modalInstance.result.then(function (result) {
            $scope.updateNews(result);
        }, function () {
        });
    };

    $scope.addNews = function(){
        $scope.insertNews();
        $scope.content ='Kliknij aby zacząć pisać swoją wiadomość...';
        $scope.title = 'Tytuł';
    };

    $scope.delete = function(id){
        $scope.deleteNews(id);
    };

    $scope.animationsEnabled = true;

    $scope.sort_field = 'date';
    //paginacja
    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;

    $scope.paginate = function(value) {
        $scope.totalItems = $scope.news.length;
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
        end = begin + $scope.itemsPerPage;
        index = $scope.news.indexOf(value);
        return (begin <= index && index < end);
    };

}]); //NewsController