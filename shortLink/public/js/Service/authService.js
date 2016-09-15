/**
 * Created by Oleg on 03.09.2016.
 */
angular.module('authService',[])
    .factory('Auth',function($http, $q, AuthToken){
        var authFactory={};
        authFactory.authUser=function(login,password){
            var data={
                login:login,
                password: password
            };
            return $http.post('index/authUser',data).success(function(data){
                AuthToken.setToken(data.token);
                return data;
            })
        };
        authFactory.logout=function(){
            AuthToken.setToken();


        };

        authFactory.isLoggedIn=function(){
          if(AuthToken.getToken()){
              return true;
          }
            else {
              return false;
          }

        };

        authFactory.getUser = function() {
            if (AuthToken.getToken())
                return $http.get('index/me');
            else
                return $q.reject({ message: 'User has no token.' });
        };

        return authFactory;
    })

    .factory('AuthToken',function($window){
        var authTokenFactory={};
        authTokenFactory.getToken=function(){
            return $window.localStorage.getItem('token');
        };
        authTokenFactory.setToken=function(token){
            if(token){
                $window.localStorage.setItem('token',token)
            }
            else {
                $window.localStorage.removeItem('token')
            }
        };
        return authTokenFactory
    })

    .factory('AuthInterceptor',function($q, $location, AuthToken){
        var interceptorFactory={};

        interceptorFactory.request = function(config) {

            var token = AuthToken.getToken();
            if (token)
                config.headers['x-access-token'] = token;

            return config;
        };

        interceptorFactory.responseError = function(response) {
            if (response.status == 403) {
                AuthToken.setToken();
                $location.path('/auth');
            }
            return $q.reject(response);
        };

        return interceptorFactory;
    })



