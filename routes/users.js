const Router = require('koa-router');

const userController = require('../controller/user');
const {EntityExistsErr} = require('../errors');
const {EntityNotFound} = require('../errors');

const users = new Router({
  prefix: '/users',
});

users.post('/', async (ctx) => {
  try {
    ctx.body = await userController.createUser(ctx.request.body);
  } catch (err) {
    if (err instanceof EntityExistsErr) {
      ctx.status = 400;
      ctx.body = err.message;
    } else {
      throw err;
    }
  }
});

users.get('/:id', async (ctx) => {
  try {
    ctx.body = await userController.getUser(ctx.params.id);
  } catch (err) {
    if (err instanceof EntityNotFound) {
      ctx.status = 404;
      ctx.body = err.message;
    } else {
      throw err;
    }
  }
});

users.put('/:id', () => {
  console.log('PUT /users/id handler not yet implemented');
});

users.delete('/:id', () => {
  console.log('DELETE /users/id handler not yet implemented');
});


module.exports = users;
