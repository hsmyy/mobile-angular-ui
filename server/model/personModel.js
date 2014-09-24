/**
 * Created by fc on 14-9-24.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./db').DB;

var personSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    userid : {
        type : Number,
        require : true
    },
    persons : {
        type : [{
            name : {
                type : String,
                require : true
            },
            data : {
                type : [{
                    key : String,
                    value : String
                }]
            }
        }]
    }
});

exports.Person = db.model('Person', personSchema, 'persons');
