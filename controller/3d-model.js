const path = require('path');
const fs = require('fs');

const {models} =require('../models');
const {EntityNotFound} = require('../errors');

const basename = path.basename(__filename);
const entityName = basename.substring(0, basename.length - 3);

const createTDO = async (userId, tdoOpts) => {
  const user = await models.User.findByPk(userId);
  return user.createThreeDimObj(tdoOpts, {
    include: models.Marker,
  });
};

const getTDOs = async (userId, limit = 5, offset = 0) => {
  return models.ThreeDimObj.findAll({
    include: [{
      model: models.Marker,
    }],
    where: {
      userId,
    },
    limit,
    offset,
  });
};

const deleteTDO = async (tdoId) => {
  const exist = await models.ThreeDimObj.findByPk(tdoId);
  if (!exist) throw new EntityNotFound(entityName);

  const tdoURI = exist.uri;
  fs.unlinkSync(tdoURI);

  return models.ThreeDimObj.destroy({
    where: {
      id: tdoId,
    },
  });
};

const updateTDO = async (tdoId, tdoOpts) => {
  const exist = await models.ThreeDimObj.findByPk(tdoId);
  if (!exist) throw new EntityNotFound(entityName);
  return models.ThreeDimObj.update(tdoOpts, {
    where: {
      id: tdoId,
    },
  });
};

module.exports = {
  createTDO,
  getTDOs,
  deleteTDO,
  updateTDO,
};
