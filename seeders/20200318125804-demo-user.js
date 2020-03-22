'use strict';

const USER_QTY = 3;
const OBJ_QTY = 30;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const testUsers = [];
    for (let i = 0; i < USER_QTY; i++) {
      testUsers.push({
        firstName: `name${i}`,
        secondName: `sname${i}`,
        username: `uname${i}`,
        password: `pwrd${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const firstId = await queryInterface.bulkInsert('Users', testUsers, {});

    const testObjs = [];
    for (let i = 0; i < OBJ_QTY; i++) {
      testObjs.push({
        name: `name${i}`,
        uri: `storage/3dObj/object${Date.now()}.glb`,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: getRandomInt(firstId, USER_QTY + 1),
      });
    }

    await queryInterface.bulkInsert('ThreeDimObjs', testObjs, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
