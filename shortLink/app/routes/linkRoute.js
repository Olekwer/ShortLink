/**
 * Created by Oleg on 07.09.2016.
 */
var Link=require('../models/link');
var shortLink=require('../libs/short');
var linkFunk;
linkFunk = function (app, express) {
    var linkRouter = express.Router();

    linkRouter.post('/creatLinkDb', function (req, res) {
        var obj = req.body;
        var tagsArr = [];
        var short = shortLink.doShort(obj.link);
        console.log(obj);
        if (obj.tags) {
            var tagsStr = obj.tags;
            tagsArr = tagsStr.split(';');
        } else {
            tagsArr = [];
        }
        if (!obj.description) obj.description = "";

        var link = new Link({
            linkname: obj.linkName,
            shortlink: short,
            description: obj.description,
            tags: tagsArr,
            hit: 0,
            user_id: obj.user_id
        });
        link.save(function (err, link, arguments) {
            if (err) return;
        })
    });

    linkRouter.post('/findMyLink', function (req, res, next) {
        var idlink = req.body.user_id;
        //console.log(idlink);

        Link.find({user_id: idlink}).exec(function (err, link) {
            if (err) return next(err);
            return res.json(link);
            //console.log(link);
        });

    });

    linkRouter.post('/findOneLink', function (req, res, next) {
        var slink = req.body.shortlink;
        //console.log(idlink);

        Link.findOne({shortlink: slink}).exec(function (err, link) {
            if (err) return next(err);
            return res.json(link);
            //console.log(link);
        });

    });

    linkRouter.post('/updateLink', function (req, res, next) {
        var slink = req.body.shortlink;

        Link.findOne({shortlink: slink}).exec(function (err, link) {
            if (err) return next(err);
            var description = req.body.description;
            var tagsArr = [];

            if (req.body.tags) {
                var tagsStr = req.body.tags;
                if (tagsStr.indexOf(';') == -1) {
                    tagsStr=tagsStr+';'
                }
                tagsArr = tagsStr.split(';');
            } else {
                tagsArr = [];
            }

            link.description = description;
            link.tags = tagsArr;
            link.save(function (err, link, arguments) {
                if (err) next(err);
                var data = {
                    messege: "все хорошо"
                };
                res.json(data);

            })

        });

    });


    linkRouter.get('/findLink', function (req, res, next) {
        //console.log(idlink);

        Link.find().exec(function (err, link) {
            if (err) return next(err);
            return res.json(link);
            //console.log(link);
        });

    });

    return linkRouter
};
exports.link=linkFunk;