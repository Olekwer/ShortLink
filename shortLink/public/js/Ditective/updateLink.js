/**
 * Created by Oleg on 13.09.2016.
 */
app.directive('updateLinkdir', function(){
    return{
        restrict:'E',
        templateUrl: '../../pages/updateLink.html',
        scope:{},
        controller: function($scope, $routeParams, FindOneLink, UpdateLink){
            $scope.link={};
            var shortlink= $routeParams.link;
            $scope.link.shortlink=shortlink;
            FindOneLink.findOneLink(shortlink).success(function(data){
               var objLink=data;
                $scope.link.linkname=objLink.linkname;

            });

            $scope.link.updateLink=function(){
                var link={
                    shortlink: $scope.link.shortlink,
                    description: $scope.link.description,
                    tags: $scope.link.tags
                };
                UpdateLink.updateLink(link).success(function(data){
                    $scope.link.message=data.messege;
                });
                console.log();
                console.log();

            }

        }
    }
});