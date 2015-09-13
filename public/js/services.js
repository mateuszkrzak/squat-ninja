var app = angular.module('szuszApp-admin-services', []);

app.factory('auth', ['$http','$log','$cookieStore', function ($http, $log, $cookieStore) {
    var urlBase = 'http://localhost:2403';

    var currentUser = $cookieStore.get('user');
    var login = function (user, success, error) {
        $http.post(urlBase + '/users/login', user).success(function (result) {
            $http.get(urlBase + '/users/me').success(function (data) {
                $cookieStore.put('user', data);
                currentUser = data;
                success(data);
            });
        }).error(error);
    };

    var logout = function (success, error) {
        $log.log('Logout');
        $http.post(urlBase + '/users/logout').success(function (result, err) {
            $cookieStore.remove('user');
            currentUser = null;
            success(result);
        }).error(function (result, err) {
            error(err);
        });
    };
    return {
        login: login,
        logout: logout,

        isLogged: function () {
            return !jQuery.isEmptyObject(currentUser);
        },
        logout: logout,
        currentUser: function () {
            return currentUser;
        },
        isAdmin: function () {
            if (jQuery.isEmptyObject(currentUser)) {
                return false;
            }
            if(currentUser.role == 'admin') return true;
            else return false;
        }
    };

}]);

app.factory('users', ['$http', function($http){

    var urlBase = 'http://localhost:2403/users';
    var users = {};

    users.getAll = function () {
        return $http.get(urlBase);
    };

    users.get = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    users.insert = function (user) {
        return $http.post(urlBase, user);
    };

    users.update = function (user) {
        return $http.put(urlBase + '/' + user.id, user)
    };

    users.delete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return users;

}]);

app.factory('news', ['$http', function($http){

    var urlBase = 'http://localhost:2403/news';
    var news = {};

    news.getAll = function () {
        return $http.get(urlBase);
    };

    news.get = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    news.insert = function (singleNews) {
        return $http.post(urlBase, singleNews);
    };

    news.update = function (singleNews) {
        return $http.put(urlBase + '/' + singleNews.id, singleNews)
    };

    news.delete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return news;

}]);