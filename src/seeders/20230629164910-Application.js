'use strict';
const applicationsList = require('./data/Applications');
const groupsList = require('./data/Group');

module.exports = {
  up: async (queryInterface, transaction) => {
    try {
        // Poblando la tabla de aplicaciones
        const resultApplication = await queryInterface.bulkInsert('TbApplication', applicationsList.applications, {
          returning: true
        });

        const idApplication = {
            0: () => {
              return resultApplication[0].id
            },
            1: () => {
              return resultApplication[0].id
            },
            2: () => {
              return resultApplication[0].id
            }, 
            3: () => {
              return resultApplication[1].id
            }, 
            4: () => {
              return resultApplication[1].id
            },
            5: () => {
              return resultApplication[1].id
            },
            6: () => {
              return resultApplication[2].id
            },
            7: () => {
              return resultApplication[2].id
            },
            8: () => {
              return resultApplication[2].id
            },
            9: () => {
              return resultApplication[3].id
            },
            10: () => {
              return resultApplication[3].id
            },
            11: () => {
              return resultApplication[3].id
            },
            12: () => {
              return resultApplication[4].id
            },
            13: () => {
              return resultApplication[4].id
            },
            14: () => {
              return resultApplication[4].id
            },
            15: () => {
              return resultApplication[5].id
            },
            16: () => {
              return resultApplication[5].id
            },
            17: () => {
              return resultApplication[5].id
            }
        }

        const idGroups = (index) => {
          return idApplication[index]();
        }

        // Seteo del applicationId al modelo de grupo
        const groupsApplication = groupsList.groups.map((item, index) => {
            return {
              ...item,
              applicationId: idGroups(index),
            }
        });

        // Poblando la tabla de grupos
        await queryInterface.bulkInsert('TbGroup', groupsApplication, {});
    } catch (error) {
      console.error('Error durante la siembra Application:', error);
    }
  }
};
