/**
 * Created by fc on 14-9-24.
 */
'use strict';

var personService = require('../service/personService');

module.exports = function(app){
    app.get('/person/:userid', function(req, res){
        personService.get(parseInt(req.param('userid')), function(err, data){
            jsonRes(err, res, data);
        })
    });

////create friend
app.post('/person/:userid/friends/:friend', function(req,res){
    //personModel.();
    personService.createFriend(parseInt(req.param('userid')), req.param('friend'), function(err){
        jsonRes(err,res);
    });
});
//
////create item
app.post('/person/:userid/friends/:friend/:key/:value', function(req, res){
    personService.createItem(parseInt(req.param('userid')), req.param('friend'), req.param('key'), req.param('value'), function(err){
        jsonRes(err, res);
    });
});
//
////remove item
app.delete('/person/:userid/friends/:friend/:key', function(req, res){
    personService.deleteItem(parseInt(req.param('userid')), req.param('friend'), req.param('key'), function(err){
        jsonRes(err, res);
    });
});
//
////create user
app.put('/person/:userid/:username', function(req, res, next){
    personService.createUser(parseInt(req.param('userid')), req.param('username'), function(err){
        jsonRes(err,res);
    });
});

//remove user
};



function jsonRes(err, res, data){
    if(err){
        console.log(err);
        res.json({'res':'err'});
    }else{
        if(data){
            res.status(200).json(data);
        }else{
            res.json({'res':'ok'});
        }
    }
}