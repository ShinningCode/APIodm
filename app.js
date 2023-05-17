const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');
const config = require('config');
const i18n = require('i18n');
const cors = require('cors');
const { ability } = require('./middlewares/casl');
//const Backlog = require('./controllers/backlogs');

//rutas de routers
// Rutas de routers
const indexRouter = require('./routes/index');
const teamMemberRouter = require('./routes/teamMember');
const boardsRouter = require('./routes/boards');
const columnsRouter = require('./routes/columns');
const proyectRecordRouter = require('./routes/proyectRecords');
const userHistoryRouter = require('./routes/userHistory');

// JWT
const jwtKey = config.get('secret.key');

// Conexión a la base de datos
const uri = config.get('dbChain');
mongoose.connect(uri);
const db = mongoose.connection;
const app = express();

db.on('open', () => {
  console.log("Conexión exitosa a la base de datos");
});
db.on('error', () => {
  console.log("Error en la conexión a la base de datos");
});

i18n.configure({
  locales: ['es', 'en'],
  cookie: 'language',
  directory: `${__dirname}/locales`
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.use(cors({
  origin: "http://127.0.0.1:8000"
}));

// Middleware CASL
app.use((req, res, next) => {
  req.ability = ability;
  next();
});

// Protección de rutas
// Descomenta las siguientes líneas si deseas proteger las rutas con JWT
/*
app.use(expressjwt({ secret: jwtKey, algorithms: ['HS256'] }))
  .unless({ path: ["/"] });
*/

// Declaración de rutas
app.use('/', indexRouter);
app.use('/teamMember', teamMemberRouter);
app.use('/boards', boardsRouter);
app.use('/columns', columnsRouter);
app.use('/proyectRecords', proyectRecordRouter);
app.use('/userHistory', userHistoryRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
