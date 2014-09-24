/**
 * Created by fc on 14-9-24.
 */
'use strict';

var mongoose = require('mongoose');

var db = mongoose.createConnection('106.185.44.133','renmai', function(err){
    if(err){
        console.log('connect error:' + err);
    }
});
db.on('error',console.error.bind(console,'连接错误:'));
mongoose.set('debug', true);

exports.DB = db;