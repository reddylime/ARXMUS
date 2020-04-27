const Router = require('koa-router');

const tdoController = require('../controller/3d-model');
const {getCurUserMock} = require('../test/mocks/');

const admin = new Router({
  prefix: '/admin',
});

admin.get('/', async (ctx) => {
  ctx.body = 'This is admin route';
});

admin.get('/models', async (ctx) => {
  const threeDimObjs = await tdoController.getTDOs(getCurUserMock().id);
  await ctx.render(('admin/models'), {
    threeDimObjs,
    data: {
      title: 'Your models',
    },
  });
});

admin.get('/models/new', async (ctx) => {
  const threeDimObjs = await tdoController.getTDOs(getCurUserMock().id);
  await ctx.render(('admin/new'), {
    threeDimObjs,
    data: {
      title: 'New model',
    },
  });
});

admin.get('/models/:id', async (ctx) => {
  const threeDimObj = await tdoController.getTDObyId(ctx.params.id);
  await ctx.render(('admin/model'), {
    threeDimObj,
    data: {
      title: 'Edit model',
    },
  });
});

module.exports = admin;
