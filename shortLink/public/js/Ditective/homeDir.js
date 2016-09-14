/**
 * Created by Oleg on 09.09.2016.
 */
app.directive('homeDir',function(){
    return{
        restrict:'E',
        templateUrl: '../../pages/homeDir.html',
        scope:{},
        controller: function($scope,$location,$rootScope, tagsService, AllLink){

            AllLink.findLink().success(function(data){
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