const Router = require('koa-router');

const tdoController = require('../controller/3d-model');
const {getCurUserMock} = require('../test/mocks');

const account = new Router({
  prefix: '/account',
});

account.get('/', async (ctx) => {
  if (!ctx.isAuthenticated()) ctx.redirect('/auth/login');
  await ctx.render(('/cms/account'), {
    title: 'Your account (Not yet Implemented)',
  });
});

account.get('/models', async (ctx) => {
  const threeDimObjs = await tdoController.getTDOs(getCurUserMock().id);
  await ctx.render(('/cms/models/list'), {
    threeDimObjs,
    title: 'Your models',
  });
});

account.get('/models/new', async (ctx) => {
  const threeDimObjs = await tdoController.getTDOs(getCurUserMock().id);
  await ctx.render(('cms/models/new'), {
    threeDimObjs,
    title: 'New model',
  });
});

account.get('/models/:id', async (ctx) => {
  const threeDimObj = await tdoController.getTDObyId(ctx.params.id);
  await ctx.render(('cms/models/model'), {
    threeDimObj,
    title: 'Edit model',
  });
});

module.exports = account;
