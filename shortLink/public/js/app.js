/**
 * Created by Oleg on 03.09.2016.
 */
var app=angular.module('MyApp',['ngRoute','authService','linkService']);
app.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
});
app.constant('USER_ROLES', {
    all: '*',
    guest: 'guest',
    user: 'user',
    author: 'author'
});