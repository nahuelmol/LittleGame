
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import "dotenv/config";

import indexRoutes 	from './routes/routes.js';
import apiroutes    from './routes/api/routesapi.js';

const app = express();

const hostname = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(cors({
  credentials: true,
  origin: true
}));

app.use('/static', express.static(path.join(__dirname,'static')));
app.use(express.static(path.join(__dirname, 'templates')));
app.use(morgan(morganFormat));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieParser());

app.set('port', process.env.PORT || 3000);
app.set('host', hostname)

app.set('views', path.join(__dirname,'templates'));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/',        indexRoutes);
app.use('/api',     apiroutes);

export default app;
