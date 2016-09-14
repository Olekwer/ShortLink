/**
 * Created by Oleg on 08.09.2016.
 */
var Link=require('../models/link');
var url = require('url');
var followFunc;
followFunc = function (app, express) {
    var followRouter = express.Router();

    followRouter.get('/to/:shortLink', function (req, res, next) {
        var short = req.params.shortLink;
        Link.findOne({shortlink: short}).exec(function (err, link) {
            if (err) next(err);
            var findlink = link.linkname;
            link.hit += 1;
            link.save(function (err, link, arguments) {
                if (err) return;
                res.redirect(findlink);
            });

        });

    });

    return followRouter;
};


exports.follow=followFunc;