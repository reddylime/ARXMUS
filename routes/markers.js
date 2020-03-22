const Router = require('koa-router');

const markerController = require('../controller/marker');
const { recvFiles } = require('../helper/helper');

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
  
  const URIs = recvFiles(['marker', 'patt'], ctx.request.files);

  markerOpts = {
    picUri: URIs.marker,
    pattUri: URIs.patt
  }

  ctx.body = await markerController.updateMarker(ctx.request.body.markerId, markerOpts);

});

markers.delete('/:id', () => {
  console.log('DELETE /markers/id handler not yet implemented');
});


module.exports = markers;
