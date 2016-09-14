/**
 * Created by Oleg on 06.09.2016.
 */
app.factory('RegisterService',function($http){
    return{
        addUser: function(userName,login,password){
            var data={
                userName: userName,
                login: login,
                password: password
            };
            return $http.post('index/creatUserDb',data)
        }
    }
})