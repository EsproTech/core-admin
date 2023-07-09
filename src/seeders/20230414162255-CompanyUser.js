const moment = require("moment");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const listCompanies = require('./data/Companies');

module.exports = {
  up: async (queryInterface, transaction) => {
    try {
      const users =  [{
          id: uuidv4(),
          password: await bcrypt.hash('3spr0t3ch2023', 10),
          email: 'admin@esprotech.com',
          firstName: 'Administrador',
          lastName: 'EsproTech',
          isSuperAdmin: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        }, {
          id: uuidv4(),
          password: await bcrypt.hash('admin', 10),
          email: 'yferia90@gmail.com',
          firstName: 'Yunior',
          lastName: 'Feria Chapman',
          isSuperAdmin: true,
          createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
          deleteAt: false
        }]

        // Poblando la tabla TbUser
        const resultUsers = await queryInterface.bulkInsert('TbUser', users, {
          returning: true
        });

        // Poblando la tabla TbCompany
        const resultCompanies = await queryInterface.bulkInsert('TbCompany', listCompanies.companies, {
          returning: true
        });

        const company_user = [
            {
                id: uuidv4(),
                active: true,
                companyId: resultCompanies[0].id,
                userId: resultUsers[0].id,
                createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
                updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
                deleteAt: false
            },
            {
                id: uuidv4(),
                active: true,
                companyId: resultCompanies[1].id,
                userId: resultUsers[1].id,
                createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
                updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
                deleteAt: false
            }
        ]

        // Poblando la tabla TbCompanyUser
        await queryInterface.bulkInsert('TbCompanyUser', company_user, {});
    }catch (error) {
      console.error('Error durante la siembra CompanyUser:', error);
    }   
  }
};
