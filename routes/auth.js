const Router = require('koa-router');
const passport = require('koa-passport');

const userController = require('../controller/user');
const {EntityExistsErr} = require('../errors');
const {EntityNotFound} = require('../errors');

const auth = new Router({
  prefix: '/auth',
});

auth.get('/register', async (ctx) => {
  await ctx.render(('/cms/auth/register'), {});
});

auth.post('/register', async (ctx) => {
  try {
    await userController.createUser(ctx.request.body);
    ctx.redirect('/auth/login');
  } catch (err) {
    if (err instanceof EntityExistsErr) {
      ctx.status = 400;
      ctx.body = err.message;
    } else {
      throw err;
    }
  }
});

auth.get('/login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    await ctx.render(('/cms/auth/login'), {});
  } else {
    ctx.redirect('/account');
  }
});

auth.post('/login', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/account');
    } else {
      ctx.status = 400;
      ctx.body = {status: 'error'};
    }
  })(ctx);
});

auth.get('/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = {success: false};
    ctx.throw(401);
  }
});

module.exports = auth;
