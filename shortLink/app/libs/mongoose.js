/**
 * Created by Oleg on 02.09.2016.
 */
var mongoose = require('mongoose');
var config= require('../config');

mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));


module.exports = mongoose;
