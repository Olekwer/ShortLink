/**
 * Created by Oleg on 07.09.2016.
 */
app.controller('mainCtr',function($rootScope, Auth, $location,currentUser){
    var scope=this;

    $rootScope.islogin=Auth.isLoggedIn();

    scope.logaut=function(){
        Auth.logout();
        currentUser.set();
        $rootScope.islogin=Auth.isLoggedIn();
    };


    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.islogin = Auth.isLoggedIn();
        // get user information on page load
        Auth.getUser()
            .then(function(data) {
                scope.user = data.data;
                currentUser.set(scope.user)
                console.log(scope.user);
            });
    });




});