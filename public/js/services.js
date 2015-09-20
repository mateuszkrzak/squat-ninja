var app = angular.module('szuszApp-services', []);
var restEnd = 'http://s6.mydevil.net:30000';

app.factory('auth', ['$http','$log','$cookieStore', function ($http, $log, $cookieStore) {
    var urlBase = restEnd;

    var currentUser = $cookieStore.get('user');
    var login = function (user, success, error) {
        $http.post(urlBase + '/users/login', user).success(function (result) {
            $http.get(urlBase + '/users/me').success(function (data) {
                storedUser = {username:data.username, role:data.role, id:data.id};
                var now = new Date(),
                expireDate = new Date(now + 600000); //10min in miliseconds

                $cookieStore.put('user', storedUser,{'expires':expireDate});
                currentUser = data;
                success(data);
            });
        });
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
        currentUser: function () {
            return currentUser;
        },
        isModerator: function () {
            if (jQuery.isEmptyObject(currentUser)) {
                return false;
            }
            if(currentUser.role == 'moderator') return true;
            else return false;
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

    var urlBase = restEnd + '/users';
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

    var urlBase = restEnd + '/news';
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

app.factory('pages', ['$http', function($http){

    var urlBase = restEnd + '/pages';
    var pages = {};

    pages.getAll = function () {
        return $http.get(urlBase);
    };

    pages.get = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    pages.insert = function (page) {
        return $http.post(urlBase, page);
    };

    pages.update = function (page) {
        return $http.put(urlBase + '/' + page.id, page)
    };

    pages.delete = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    pages.getSitename = function(){
        var sitename = '';
        pages.getAll()
            .success(function (pages) {
                angular.forEach(pages,function(value){
                    if(value.type=='header'){
                        sitename = value.content;

                    }
                });
            });

    };

    return pages;
}]);