const Koa = require('koa');
const koaBody = require('koa-body');
const bodyClean = require('koa-body-clean');

const router = require('./routes');
const db = require('./models');

const app = new Koa();

app.use(koaBody({multipart: true}));
app.use(bodyClean());
app.use(router.routes(), router.allowedMethods());

app.listen(3000);
