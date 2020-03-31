const Router = require('koa-router');

const markerController = require('../controller/marker');
const {storeFiles} = require('../helper/helper');
const {EntityNotFound} = require('../errors');

const markers = new Router({
  prefix: '/markers',
});

markers.get('/', () => {
  console.log('GET /markers handler not yet implemented');
});

markers.post('/', () => {
  console.log('POST /markers handler not yet implemented');
});

markers.get('/:id', () => {
  console.log('GET /markers/id handler not yet implemented');
});

markers.put('/:id', async (ctx) => {
  try {
    const URIs = storeFiles(['marker', 'patt'], ctx.request.files);

    markerOpts = {
      picUri: URIs.marker,
      pattUri: URIs.patt,
    };

    await markerController.updateMarker(ctx.request.body.markerId, markerOpts);
    ctx.status = 204;
  } catch (err) {
    if (err instanceof EntityNotFound) {
      ctx.body = err.message;
    }
  }
});

markers.delete('/:id', () => {
  console.log('DELETE /markers/id handler not yet implemented');
});


module.exports = markers;
