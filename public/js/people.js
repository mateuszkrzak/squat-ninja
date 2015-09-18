angular.module('szuszApp-peopleController', ['ngResource','ui.bootstrap'])
    .controller('PeopleController', ['$scope', 'users', '$routeParams', function ($scope, users, $routeParams) {
        $scope.users = [];
        $scope.person = {};
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

        $scope.person.id = $routeParams.personId;


        users.get($routeParams.personId)
            .success(function(data){
                $scope.tabs = data.tabs;
                $scope.person.profile = data.profile;

                $scope.tabs[0].active = true;
            })
            .error(function(){
                $scope.tabs = [];
            });
    }]);