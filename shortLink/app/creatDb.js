/**
 * Created by Oleg on 01.09.2016.
 */
var User  = require('./models/user');

var user=new User({
    name: "Oleg",
    username: "olekwer",
    password: "123"
});
User.find(function (err, users) {
    console.log(users)
});
/*user.save(function(err,user,arguments){
    if (err) throw err;
    console.log(arguments)
});*/