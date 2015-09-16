angular.module('szuszApp-profileController', ['ngResource','ui.bootstrap'])
    .controller('profileController', ['$scope', 'users', 'news', 'auth','$timeout', function ($scope, users, news, auth, $timeout) {
        $scope.me = auth.currentUser();
        $scope.alert ={};
        $scope.originalprofile = {};

        users.get($scope.me.id)
            .success(function(data){
                $scope.tabs = data.tabs;
                $scope.profile = data.profile;
                $scope.originalprofile = $scope.profile;

                $scope.tabs[0].active = true;
            })
            .error(function(){
               $scope.tabs = [];
            });


        $scope.deleteTab = function () {
            if ($scope.tabs[$scope.tabs.length-1].active == true){
                $scope.tabs[$scope.tabs.length-2].active =true;
            }
            $scope.tabs.pop();
            $scope.me.tabs = $scope.tabs;

            users.update($scope.me)
                .success(function (data) {
                    $scope.tabs = data.tabs;
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        $scope.saveTab = function () {
            $scope.me.tabs = $scope.tabs;

            users.update($scope.me)
                .success(function (data) {
                    $scope.tabs = data.tabs;
                    $scope.alert.tab = { type: 'success', msg: 'Poprawnie zapisano zmiany w zakładce.' };
                    $timeout(function(){
                        delete $scope.alert.tab;
                    }, 3000);
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        $scope.addTab = function() {
            $scope.tabs.push({
                title: "Zakładka",
                content: "Treść",
                active: true
            });
            $scope.saveTab();
        };


        $scope.resetForm = function ()
        {
            $scope.profile= angular.copy($scope.originalprofile);
            $scope.profileForm.$setPristine();
        };

        $scope.saveProfile = function () {
            $scope.me.profile = $scope.profile;

            users.update($scope.me)
                .success(function (data) {
                    $scope.profile = data.profile;
                    $scope.alert.profile = { type: 'success', msg: 'Poprawnie zapisano zmiany w profilu.' };
                    $timeout(function(){
                        delete $scope.alert.profile;
                    }, 3000);
                })
                .error(function(data) {
                    console.log(data);
                });
        };




        $scope.closeAlert = function() {
            delete $scope.alert;
        };

    }]);