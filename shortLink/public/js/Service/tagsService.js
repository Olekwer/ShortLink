/**
 * Created by Oleg on 09.09.2016.
 */
app.factory('tagsService',function($http){
    var tags={};

    tags.findLiksTag=function(tag){
        var data={
            tag:tag
        };
        return $http.post('tag/tags', data)
    };

    return tags;
});