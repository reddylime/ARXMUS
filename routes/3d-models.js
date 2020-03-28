const fs = require('fs');
const path = require('path');

const Router = require('koa-router');

const tdoController = require('../controller/3d-model');
const {EntityNotFound} = require('../errors');
const { storeFiles } = require('../helper/helper');
const {getCurUserMock} = require('../test/mocks/');

const models = new Router({
  prefix: '/models',
});

models.get('/', async (ctx) => {
  const userId = getCurUserMock().id;
  const limit = ctx.query.limit ? parseInt(ctx.query.limit) : ctx.query.limit;
  const offset = ctx.query.offset ? parseInt(ctx.query.offset) : ctx.query.offset;
  ctx.body = await tdoController.getTDOs(userId, limit, offset);
});

models.post('/', async (ctx) => {
  const URIs = storeFiles(['tdo', 'marker', 'patt'], ctx.request.files);
  
  const tdoOpts = {
    name: ctx.request.body.name,
    uri: URIs.tdo,
    Marker: {
      picUri: URIs.marker,
      pattUri: URIs.patt,
    },
  };

  const userId = getCurUserMock().id;
  ctx.body = await tdoController.createTDO(userId, tdoOpts);
});

models.get('/:id', () => {
  console.log('GET /models/id handler not yet implemented');
});

models.put('/:id', async (ctx) => {
  try {
    await tdoController.updateTDO(ctx.params.id, ctx.request.body);
    ctx.status = 204;
  }catch(err) {
    if (err instanceof EntityNotFound) {
      ctx.status = 404;
      ctx.body = Jerr.message;
    }
  }
});

models.delete('/:id', async (ctx) => {
  try {
    await tdoController.deleteTDO(ctx.params.id);
    ctx.status = 204;
  } catch (err) {
    if (err instanceof EntityNotFound) {
      ctx.status = 404;
      ctx.body = JSON.stringify(err.message);
    } else {
      throw err;
    }
  }
});


module.exports = models;
