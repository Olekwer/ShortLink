/**
 * Created by Oleg on 03.09.2016.
 */
app.directive('regDir',function(){
    return{
        restrict: 'E',
        templateUrl: '../../pages/regedit.html',
        scope:{},
        controller: function($scope,RegisterService,$window,$rootScope,$location){
            if($rootScope.islogin){
                $location.path('/');
            }
            $scope.user={};
            console.log($window.localStorage		);
            $scope.regFunc=function(){
               // console.log($scope.user.name+" "+$scope.user.login+" "+$scope.user.password);

                RegisterService.addUser($scope.user.name,$scope.user.login,$scope.user.password).success(function(data){
                    $scope.bol=data.bool;
                   // console.log($scope.bol);
                    if(data.bool){
                        $scope.suc=true;
                        $scope.er=false;
                    }
                    else {
                        $scope.er=true;
                        $scope.suc=false;
                    }
                });
            }
        }
    }
})