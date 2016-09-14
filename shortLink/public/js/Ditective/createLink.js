/**
 * Created by Oleg on 07.09.2016.
 */
app.directive('createlinkDir',function(){
   return{
       restrict:'E',
       templateUrl: '../../pages/createLink.html',
       scope:{},
       controller: function($scope, LinkCreate, currentUser,$rootScope,$location){
           if(!$rootScope.islogin) $location.path('/auth');
           $scope.link={};



           $scope.createLink=function(){
               if (!$scope.link.linkName) return;

               if($scope.link.tags) {
                   if ($scope.link.tags.indexOf(';') == -1) {
                       $scope.link.tags = $scope.link.tags + ';'
                   }
               }
               console.log($scope.link.tags);
               var user=currentUser.get();
               $scope.link.user_id=user;
               LinkCreate.createLink($scope.link);
               $location.path('/myLink')
           }
       }
   }
});