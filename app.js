const express 	= require('express');
const path 		= require('path');
const morgan 	= require('morgan');
const cors      = require('cors');

const indexRoutes 	= require('./routes/routes');
const apiroutes     = require('./routes/api/routesapi');
const bodyParser 	= require('body-parser');

const app = express();

const hostname = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(cors());
app.use('/static', express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, 'templates')));
app.use(morgan(morganFormat));

//app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.set('host', hostname)

app.set('views',path.join(__dirname,'templates'));
app.set('view engine', 'ejs');

app.use('/',        indexRoutes);
app.use('/api',     apiroutes);

module.exports = app;
