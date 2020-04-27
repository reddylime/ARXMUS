const Koa = require('koa');
const koaBody = require('koa-body');
const bodyClean = require('koa-body-clean');
const render = require('koa-ejs');
const path = require('path');
const serve = require('koa-static');

const router = require('./routes');
const db = require('./models');

db.init();

const app = new Koa();

render(app,
    {
      root: path.join(__dirname, 'view'),
      layout: false,
      viewExt: 'html',
      cache: false,
      debug: true,
    },
);

app.use(serve('./'));

app.use(koaBody({multipart: true}));
app.use(bodyClean());
app.use(router.routes(), router.allowedMethods());

app.listen(3000);
