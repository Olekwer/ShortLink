/**
 * Created by Oleg on 03.09.2016.
 */
var mongoose=require('../libs/mongoose');
var Schema=mongoose.Schema;

var LinkSchema= new Schema({
    linkname : {type: String, required: true},
    shortlink: {type: String},
    description:{type: String},
    tags: {type: Array},
    hit: {type: Number},
    user_id: {type: String}

});

module.exports = mongoose.model('Link', LinkSchema);