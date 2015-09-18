angular.module('szuszApp-homeController', ['ui.bootstrap'])
    .controller('HomeController', ['$scope', 'news', 'pages', 'users', '$filter', function ($scope, news, pages, users, $filter) {
        $scope.panels = [];
        $scope.news = [];

        pages.getAll()
            .success(function (pages) {
                angular.forEach(pages, function(value, key) {
                    if (value.type=="panel") {
                        $scope.panels[key-1] = value;
                    }
                });
            })
            .error(function (data, error) {
                console.log(data + "\n" + error);
            });

        news.getAll()
            .success(function (news) {
                $scope.news = news;
                $scope.news.sort(compareDate).reverse();
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

        $scope.itemsPerPage = 5;
        $scope.currentPage = 1;

        $scope.paginate = function(value) {
            $scope.totalItems = $scope.news.length;
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
            end = begin + $scope.itemsPerPage;
            index = $scope.news.indexOf(value);
            return (begin <= index && index < end);
        }

        function compareDate(a,b) {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        }
    }]);