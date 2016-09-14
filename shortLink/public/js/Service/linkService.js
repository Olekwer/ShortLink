/**
 * Created by Oleg on 07.09.2016.
 */
angular.module('linkService',[])
    .factory('LinkCreate',function($http,Auth){
        var link={};
        var obj={};
        link.createLink=function(link){

            return $http.post('/link/creatLinkDb',link)

        };

        return link
    })

    .factory('MyLink',function($http){
        var mylink={};

        mylink.findMyLink=function(user_id){
            var data={
                user_id : user_id
            };
            return $http.post('/link/findMyLink',data)
        };

        return mylink;
    })

    .factory('AllLink',function($http){
        var link={};

        link.findLink=function(){
            return $http.get('/link/findLink')
        };

        return link;
    })

    .factory('FindOneLink',function($http){
        var link={};

        link.findOneLink=function(shortlink){
            var data={
                shortlink : shortlink
            };
            return $http.post('/link/findOneLink',data)
        };

        return link;
    })

    .factory('UpdateLink',function($http){
        var link={};

        link.updateLink=function(data){

            return $http.post('/link/updateLink',data)
        };

        return link;
    });