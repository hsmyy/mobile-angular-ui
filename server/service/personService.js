/**
 * Created by fc on 14-9-24.
 */

var personModel = require('../model/personModel').Person;

exports.get = function(userid, callback){
    personModel.findOne({userid : userid}).exec(function(err, data){
        callback(err, data);
    });
};

exports.createFriend = function(userid, friend, callback){
    personModel.update({userid : userid}, {$push:{persons:{'name' : friend, data : []}}}, function(err){
        callback(err);
    });
};

exports.createItem = function(userid, friend, key, value, callback){
    personModel.findOne({userid : userid}).exec(function(err, data){
        if(!err){
            for(var i = 0, n = data.persons.length; i < n; i += 1){
                if(data.persons[i].name === friend){
                    data.persons[i].data.push({key: key, value: value});
                }
            }
            data.save(function(err){
                callback(err);
            });
        }
    });
};

exports.deleteItem = function(userid, friend, key, callback){
    personModel.findOne({userid : userid}).exec(function(err, data){
        if(!err){
            for(var i = 0, n = data.persons.length; i < n; i += 1){
                if(data.persons[i].name === friend){
                    //TODO delete key
                    //data.persons[i].data.splice(i,1);

                }
            }
            data.save(function(err){
                callback(err);
            });
        }
    });
};

exports.createUser = function(userid, username, callback){
    personModel.create({name:req.param('username'), userid : parseInt(req.param('userid'))}, function(err){
        callback(err);
    });
};