angular.module('szuszApp-registerController', [])
    .controller('RegisterController', ['$scope', '$http', 'users', function ($scope, $http, users) {
        $scope.newUser ={};
        $scope.registered = false;


        $scope.register = function () {
            if (!$scope.username                || !$scope.firstname                || !$scope.lastname                || !$scope.password) {
                $scope.error = "Uzupełnij wszystkie pola formularza.";
                return;
            }
            if(!$scope.email){
                $scope.error = "Wpisz poprawny adres e-mail.";
                return;
            }

            newUser = {
                'username':$scope.username,
                'password':$scope.password,
                'firstname': $scope.firstname,
                'lastname': $scope.lastname,
                'role': 'user',
                'activated' : $scope.activated,
                'profile': {
                    "title": "",
                    "degree": "",
                    "email": $scope.email,
                    "site": "",
                    "avatar": "img/member.png"
                }
            };


            users.insert(newUser)
                .success(function (data) {
                    $scope.registersuccess = "Udało Ci się poprawnie zarejestrować. Możesz się już zalogować, ale żeby Twój profil był widoczny na stronie musisz poczekać na aktywację administratora.";
                    $scope.registered = true;

                })
                .error(function(data,status) {
                    errorMsg = "";
                    angular.forEach(data.errors, function(value, key) {
                        errorMsg += key + " " + value +"\n";
                    });
                    $scope.error = "Błąd " + status + ":\n" + errorMsg;
                });
        }

    }]);