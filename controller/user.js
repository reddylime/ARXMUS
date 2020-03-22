const path = require('path');
const basename = path.basename(__filename);

const models = require('../models');
const {EntityExistsErr} = require('../errors');
const {EntityNotFound} = require('../errors');

const entityName = basename.substring(0, basename.length - 3);

const createUser = async (userOpts) => {
  const exist = await models.User.findOne({
    where: {
      username: userOpts.username,
    },
  });

  if (!exist) {
    return models.User.create(userOpts);
  }

  throw new EntityExistsErr(entityName);
};

const getUser = async (userId) => {
  const user = await models.User.findByPk(userId);

  if (user) return user;

  throw new EntityNotFound(entityName);
};

module.exports = {
  createUser,
  getUser,
};
