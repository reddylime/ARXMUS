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

const getTDOsByGroup = async (userId, group) => {
  return models.ThreeDimObj.findAll({
    include: [{
      model: models.Marker,
    }],
    where: {
      userId,
      group,
    },
  });
};

const deleteTDO = async (tdoId) => {
  const exist = await models.ThreeDimObj.findByPk(tdoId, {
    include: [{
      model: models.Marker,
    }],
  });
  if (!exist) throw new EntityNotFound(entityName);

  const tdoURI = exist.uri;
  const markerUri = exist.Marker.picUri;
  const pattUri = exist.Marker.pattUri;

  try {
    fs.unlinkSync(tdoURI);
    fs.unlinkSync(markerUri);
    fs.unlinkSync(pattUri);
  } catch (err) {
    throw new Error('CANT UNLINK MODELS');
  }

  return models.ThreeDimObj.destroy({
    where: {
      id: tdoId,
    },
  });
};

const updateTDO = async (tdoId, tdoOpts) => {
  const exist = await models.ThreeDimObj.findByPk(tdoId, {
    include: [{
      model: models.Marker,
    }],
  });
  if (!exist) throw new EntityNotFound(entityName);
  await models.ThreeDimObj.update(tdoOpts, {
    where: {
      id: tdoId,
    },
  });

  await exist.Marker.update(tdoOpts.Marker);
};

getTDObyId = async (tdoId) => {
  return models.ThreeDimObj.findByPk(tdoId, {
    include: [{
      model: models.Marker,
    }],
  });
};

module.exports = {
  createTDO,
  getTDOs,
  deleteTDO,
  updateTDO,
  getTDOsByGroup,
  getTDObyId,
};
