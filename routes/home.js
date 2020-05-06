const Router = require('koa-router');

const home = new Router();

home.get('/', async (ctx) => {
  const user = ctx.isAuthenticated() ? ctx.state.user : false;
  await ctx.render(('cms/home'), {
    title: 'ARCMS',
    user: user,
  });
});

module.exports = home;
