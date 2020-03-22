const models = require('../models');

const updateMarker = async (markerId, markerOpts) => {
  await models.Marker.update(markerOpts, {
      where: {
          id: markerId
      }
  });
};

module.exports = {
  updateMarker,
};
