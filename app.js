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


app.get('/person/:userid', function(req, res){
    personModel.find({userid : parseInt(req.param('userid'))}).exec(function(err, data){
        if(err){

        }else{
            res.status(200).json(data);
        }
    });
});

app.post('/person/:userid', function(req,res){
    //personModel.();
});

app.put('/person/:userid', function(req, res){

})


app.listen(app.get('port'));