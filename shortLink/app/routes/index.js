/**
 * Created by Oleg on 03.09.2016.
 */
var User  = require('../models/user');
var jwt        = require('jsonwebtoken');
var config=require('../config');

var apiFunc;
apiFunc = function (app, express) {
    var apiRouter, superSecret;
    apiRouter = express.Router();
    superSecret = config.get('webtoken:secret');

    apiRouter.post('/creatUserDb', function (req, res) {
        console.log(req.body);
        var user;
        user = new User({
            name: req.body.userName,
            username: req.body.login,
            password: req.body.password
        });
        user.save(function (err, user, arguments) {
            var data = {};
            if (err) {
                data.bool = false;
            }
            else {
                data.bool = true;
                console.log("user add db")
            }
            ;
            res.json(data);
        });

    });

    apiRouter.post('/authUser', function (req, res) {
        //   console.log(req.body)
        // res.json(req.body);

        User.findOne({username: req.body.login}).select('name username password').exec(function (err, user, next) {
            if (err) next(err);
            if (!user) {
                return res.end(401);
            }
            if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    return res.end(401)
                }
                if (validPassword) {
                    var token = user.generateJwt();
                    //   console.log(token);
                    res.json({token: token})
                }

            }

        });

    });

    apiRouter.use(function (req, res, next) {
        // do logging
        console.log('Somebody just came to our app!');

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, superSecret, function (err, decoded) {

                if (err) {
                    res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next(); // make sure we go to the next routes and don't stop here
                }
            });

        } else {

            // if there is no token
            // return an HTTP response of 403 (access forbidden) and an error message
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    apiRouter.get('/me', function (req, res) {
        //  if (403) next();

        res.send(req.decoded);
    });

    return apiRouter
};
exports.api=apiFunc;