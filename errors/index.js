class EntityExistsErr extends Error {
  constructor(entity) {
    super(`This ${entity} already exists!`);
  }
}

class EntityNotFound extends Error {
  constructor(entity) {
    super(`This ${entity} does not exist!`);
  }
}

module.exports = {
  EntityExistsErr,
  EntityNotFound,
};
