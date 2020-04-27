const Router = require('koa-router');

const tdoController = require('../controller/3d-model');
const {getCurUserMock} = require('../test/mocks/');

const ar = new Router({
  prefix: '/ar',
});

ar.get('/:group', async (ctx) => {
  const threeDimObjs = await tdoController.getTDOsByGroup(getCurUserMock().id, ctx.params.group);
  await ctx.render('ar/ar-group', {
    threeDimObjs,
  });
});


module.exports = ar;
