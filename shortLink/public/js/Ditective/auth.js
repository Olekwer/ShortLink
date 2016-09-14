/**
 * Created by Oleg on 05.09.2016.
 */
app.directive('authDir',function(){
    return{
        restrict: 'E',
        templateUrl: '../../pages/auth.html',
        scope:{},
        controller: function($scope,$rootScope, Auth, $location){
            if($rootScope.islogin){
                $location.path('/');
            }
            $scope.user={};
            $scope.authFunc=function(){
                Auth.authUser($scope.user.login,$scope.user.password).success(function(data){
                    $rootScope.islogin=Auth.isLoggedIn();
                    $location.path('/');
                })
            };

        }
    }
})