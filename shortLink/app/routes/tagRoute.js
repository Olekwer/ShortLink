/**
 * Created by Oleg on 09.09.2016.
 */
var Link=require('../models/link');

var tagFunc;
tagFunc = function (app, express) {

    var tagRoute = express.Router();

    tagRoute.post('/tags', function (req, res, next) {
        var tag = req.body.tag;
        Link.find({tags: tag}).exec(function (err, link) {
            if (err) return next(err);
            res.json(link);
        });
    });

    tagRoute.post('/tagsf/:tag', function (req, res, next) {
        var tag = req.params.tag;
        Link.find({tags: tag}).exec(function (err, link) {
            if (err) return next(err);
            res.json(link);
        });
    });


    return tagRoute;


};
exports.tag=tagFunc;