var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

app.use(partials());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Lm3hd 9Ig'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Helpers dinamicos:
app.use (function(req,res,next){

//guardar el path de cada peticion http en session.redir para poder redirecionar a la vista anterior despues de hacer login logout
	if (!req.path.match(/\/login|\/logout/)){
		req.session.redir=req.path;
	}
	
	//hacer visible req.session en las vistas
	res.locals.session = req.session;
	next();
});

app.use(function(req,res,next){
 if (req.session.user){
	if(!req.session.stamp){
	   	req.session.stamp=new Date().getTime();		
	}else{
		ahora=new Date().getTime();
		if ((ahora - req.session.stamp)>120000){ 
			errors=(req.session.errors || 'sesion caducada..!');			
			req.session.errors={};
			req.session.stamp=null;
			res.locals.session.user=undefined;
			res.render('sessions/new',{errors: errors});
		}else{req.session.stamp=new Date().getTime();}
	     }
 }
 next();
});
	
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
	    errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
