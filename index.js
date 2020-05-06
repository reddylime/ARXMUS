const HOST = 'http://127.0.0.1';
const PORT = '3000';

const Koa = require('koa');
const koaBody = require('koa-body');
const bodyClean = require('koa-body-clean');
const render = require('koa-ejs');
const path = require('path');
const serve = require('koa-static');

const session = require('koa-session');
const passport = require('koa-passport');

const router = require('./routes');
const db = require('./models');

db.init();

const app = new Koa();

// sessions
app.keys = ['super-secret-key'];
app.use(session(app));

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

render(app,
    {
      root: path.join(__dirname, 'view'),
      layout: false,
      viewExt: 'html',
      cache: false,
      debug: false,
    },
);

app.use(serve('./'));

app.use(koaBody({multipart: true}));
app.use(bodyClean());
app.use(router.routes(), router.allowedMethods());

console.log(`Server is up on: ${HOST}:${PORT}`);

app.listen(PORT);
