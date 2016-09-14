/**
 * Created by Oleg on 13.09.2016.
 */
app.directive('infoDir',function(){
    return{
        restrict: 'E',
        templateUrl:'../../pages/info.html',
        scope:{},
        controller: function($scope, FindOneLink, $routeParams, tagsService){
            $scope.link={};
            var shortlink= $routeParams.link;
            FindOneLink.findOneLink(shortlink).success(function(data){
                var objLink=data;
                $scope.link.linkname=objLink.linkname;
                $scope.link.shortlink=objLink.shortlink;
                $scope.link.description=objLink.description;
                $scope.link.tags=objLink.tags;
                $scope.link.hit=objLink.hit;

            });

            $scope.clickTag=function(tag){
                tagsService.findLiksTag(tag).success(function(data){
                    $scope.links=data;
                })
            };
        }
    }
})