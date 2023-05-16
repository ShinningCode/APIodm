const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const {expressjwt} = require('express-jwt');
const config = require('config');
const i18n = require('i18n');
const cors = require('cors');


//rutas de routers
const indexRouter = require('./routes/index');
const teamMemberRouter = require('./routes/teamMember');


//jwt
const jwtKey = config.get('secret.key')

//conection to database
const uri = config.get('dbChain');
mongoose.connect(uri);
const db = mongoose.connection;
const app = express();

db.on('open',()=>{
  console.log("Conection ok");
})
db.on('error',()=>{
  console.log("No conection");
})

i18n.configure({
  locales:['es','en'],
  cookie:'language',
  directory:`${__dirname}/locales`
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.use(cors({
  origin:"http://127.0.0.1:8000"
}));

//protecion de rutas

//app.use(expressjwt({secret:jwtKey,algorithms:['HS256']}))
//   .unless({path:["/"]})


//declaración de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
