/**
 * Created by Oleg on 08.09.2016.
 */
app.directive('mylinkDir',function(){
    return{
        restrict:'E',
        templateUrl: '../../pages/myLink.html',
        scope:{},
        controller: function(MyLink, currentUser,$scope,$location,$rootScope, tagsService){


            if(!$rootScope.islogin){
                $location.path('/');
                return;
            }
            if (!currentUser.get()) return;
            var iduser=currentUser.get()._id;
            MyLink.findMyLink(iduser).success(function(data){
               // console.log(data);
                $scope.links=data;

            });

            $scope.clickTag=function(tag){
                tagsService.findLiksTag(tag).success(function(data){
                    $scope.links=data;
                })
            };


        }
    }
})