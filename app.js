var express = require('express'),path = require('path');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./server/router/personRouter')(app);

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'));