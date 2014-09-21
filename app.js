var express = require('express'),path = require('path');

var app = express();

app.set('port', process.env.PORT || 5000);

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);

app.use(express.static(path.join(__dirname, 'demo')));

app.get('/hello', function(req, res){
   res.status(200).json({name : 'hello world'});
});

app.listen(app.get('port'));