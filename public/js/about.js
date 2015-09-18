angular.module('szuszApp-aboutController', [])
    .controller('AboutController', ['$scope', 'pages', '$timeout', function ($scope, pages, $timeout) {
        pages.getAll()
            .success(function (pages) {
                angular.forEach(pages, function(value, key) {
                    if (value.type=="about") {
                        $scope.about = value.content;
                    }
                });
            })
            .error(function (data, error) {
                console.log(data + "\n" + error);
            });

    }]);