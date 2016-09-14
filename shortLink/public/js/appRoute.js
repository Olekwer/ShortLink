/**
 * Created by Oleg on 03.09.2016.
 */
app.config(RouteConfig);
RouteConfig.$inject=['$routeProvider'];
function RouteConfig($routeProvider){
    $routeProvider
        .when('/registration',{
            template: '<reg-dir></reg-dir>'
        })
        .when('/auth',{
            template: '<auth-dir></auth-dir>'
        })
        .when('/',{
            templateUrl: '../pages/home.html'
        })
        .when('/createLink',{
            template: '<createlink-dir></createlink-dir>'
        })

        .when('/myLink',{
            template: '<mylink-dir></mylink-dir>'
        })
        .when('/update/:link',{
            template: '<update-linkdir></update-linkdir>'
        })

        .when('/info/:link',{
            template: '<info-dir></info-dir>'
        })

}