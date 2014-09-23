var express = require('express'),path = require('path');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'demo')));

//db
mongoose.set('debug', true);
var db = mongoose.createConnection('106.185.44.133','renmai', function(err){
    //console.log('connect error:' + err);
});

db.on('error',console.error.bind(console,'连接错误:'));

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

var personModel = db.model('Person', personSchema,'persons');

//get info
app.get('/person/:userid', function(req, res){
    personModel.findOne({userid : parseInt(req.param('userid'))}).exec(function(err, data){
        jsonRes(err,res, data);
    });
});

//create friend
app.post('/person/:userid/friends/:friend', function(req,res){
    //personModel.();
    personModel.update({userid : parseInt(req.param('userid'))}, {$push:{persons:{'name' : req.param('friend'), data : []}}}, function(err){
        jsonRes(err,res);
    });

});

//create item
app.post('/person/:userid/friends/:friend/:key/:value', function(req, res){
    personModel.findOne({userid : parseInt(req.param('userid'))}).exec(function(err, data){
        if(!err){
            for(var i = 0, n = data.persons.length; i < n; i += 1){
                if(data.persons[i].name === req.param('friend')){
                    data.persons[i].data.push({key: req.param('key'), value: req.param('value')});
                }
            }
            data.save(function(err){
                jsonRes(err, res);
            });
        }
    });
});

//remove item
app.delete('/person/:userid/friends/:friend/:key', function(req, res){
    personModel.findOne({userid : parseInt(req.param('userid'))}).exec(function(err, data){
        if(!err){
            for(var i = 0, n = data.persons.length; i < n; i += 1){
                if(data.persons[i].name === req.param('friend')){
                    data.persons[i].data.splice(i,1);
                }
            }
            data.save(function(err){
                jsonRes(err, res);
            });
        }
    })
});

//create user
app.put('/person/:userid/:username', function(req, res, next){
    personModel.create({name:req.param('username'), userid : parseInt(req.param('userid'))}, function(err){
        jsonRes(err,res);
    });
});

//remove user

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


app.listen(app.get('port'));