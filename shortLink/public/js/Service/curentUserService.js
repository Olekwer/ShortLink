/**
 * Created by Oleg on 08.09.2016.
 */
app.factory('currentUser', function(){
    var currentUser={};
    var user;
    currentUser.set=function(tempuser){
        user=tempuser;
    }
    currentUser.get=function(){
        return user;
    }
    return currentUser;
})