import _ from "lodash";
import sequelize from "sequelize";
import { Op } from "sequelize";
import {v4 as uuidv4 } from 'uuid';

import models from "../../models/index";
let TbUser = models.TbUser;
let TbAddress = models.TbAddress;
let TbUserAddress = models.TbUserAddress;
let TbCompany = models.TbCompany;

import { getAddressByUserId } from '../services/UserService';

import Response from "../../utils/response";
import { getOffset, updatedAt, createdUpdateAt } from "../../utils/utils";

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * size : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, users, totalPages, currentPage };
};

async function searchUsers(req, res) {
    let { filter } = req.params;
    filter = filter.toLowerCase();
    const { page, limit } = req.query;
    const options = {
        offset: getOffset(page, limit),
        limit: (!_.isUndefined(limit) ? limit : 20),
    }
    return TbUser
        .findAll({
            ...options, attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                deleteAt: false,
                [Op.or]: {
                    firstName: sequelize.where(sequelize.fn('LOWER', sequelize.col('firstName')), 'LIKE', '%' + filter + '%'),
                    lastName: sequelize.where(sequelize.fn('LOWER', sequelize.col('lastName')), 'LIKE', '%' + filter + '%'),
                    email: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), 'LIKE', '%' + filter + '%')
                }
            }
        })
        .then(listUser => {
            if (listUser) {
                const resp = Response(200, { users: listUser }, {});
                return res.status(200).json(resp);
            }
        })
        .catch(e => {
            const resp = Response(202, {}, `Ocurrió un error filtrando por el criterio enviado.`);
            return res.status(202).json(resp);
        });
}

module.exports = {
    list(req, res) {
        const { page, size } = req.query;

        const { limit, offset } = getPagination(page, size);

        const options = {
            where: {
                active: true,
                deleteAt: false
            },
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }

        TbUser.findAndCountAll({
            ...options,
            include: [{
                    model: TbAddress,
                    as: "address",
                    required: false,
                    where: {
                        deleteAt: false
                    }
                },
                {
                    model: TbCompany,
                    as: "companies",
                    required: false,
                    where: {
                        deleteAt: false
                    }
                }
            ],
            attributes: { exclude: ['updatedAt', 'deleteAt'] }
         })
        .then(data => {
            const response = getPagingData(data, page, limit);
            const resp = Response(200, { users: response }, "");
            return res.status(200).json(resp);
        })
        .catch(err => {
            const resp = Response(500, {}, `Ocurrió un error interno`);
            return res.status(500).json(resp);
        });
    },

    retrieve(req, res) {
        const { id } = req.params;
        return TbUser
            .findOne({
                include: [{
                    model: TbAddress,
                    as: "address",
                    required: false,
                    where: {
                        deleteAt: false
                    }
                }, {
                    model: TbCompany,
                    as: "companies",
                    required: false,
                    where: {
                        deleteAt: false
                    }
                }], attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(async (user) => {
                if (!user) {
                    const resp = Response(202, {}, `No existe usuario asociado al id ${id}`);
                    return res.status(202).json(resp);
                } else {
                    const resp = Response(200, { user }, {});
                    return res.status(200).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, `Ocurrió un error obteniendo el usuario asociado al id ${id}`);
                return res.status(202).json(resp);
            });
    },

    addAddress(req, res) {
        const { userId } = req.params;
        return TbUser
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] },
                where: {
                    id: userId,
                    deleteAt: false
                }
            })
            .then(async (user) => {
                if (user) {
                    const data = { ...req.body, id: uuidv4(), ...createdUpdateAt() };
                    return TbAddress
                        .create(data).then(newAddress => {
                            TbUserAddress.create({
                                id: uuidv4(),
                                userId,
                                addressId: newAddress.id,
                                active: true
                            }).then(async userAddress => {
                                const user = await getAddressByUserId(userId);
                                const resp = Response(200, { user }, {});
                                return res.status(200).json(resp);
                            }).catch(e => {
                                const msg = _.get(e.original, ["detail"], "Ocurrió un error asociando el usuario con la dirección");
                                const resp = Response(202, {}, { error: msg });
                                return res.status(202).json(resp);    
                            })
                        }).catch(e => {
                            console.log("ERROR######",e);
                            const msg = _.get(e.original, ["detail"], "Ocurrió un error creando la dirección");
                            const resp = Response(202, {}, { error: msg });
                            return res.status(202).json(resp);
                        });
                } else {
                    const resp = Response(202, {}, `El usuario con id ${id} no fue encontrado.`);
                    return res.status(202).json(resp);
                }
            }).catch((e) => {
                console.log("ERROR###### e",e);
                const resp = Response(202, {}, `Ocurrió un error interno.`);
                return res.status(202).json(resp);
            });
    },

    update(req, res) {
        const { id } = req.params;
        return TbUser
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] },
                where: {
                    id,
                    deleteAt: false
                }
            })
            .then(async (user) => {
                if (user) {
                    const data = { ...req.body, ...updatedAt() };
                    return user
                        .update(data)
                        .then((newUser) => {
                            const resp = Response(200, { user: newUser }, {});
                            return res.status(200).json(resp);
                        }).catch((e) => {
                            const resp = Response(202, {}, `Ocurrió un error interno.`);
                            return res.status(202).json(resp);
                        });
                } else {
                    const resp = Response(202, {}, `El usuario con id ${id} no fue encontrado.`);
                    return res.status(202).json(resp);
                }
            }).catch((e) => {
                const resp = Response(202, {}, `Ocurrió un error interno.`);
                return res.status(202).json(resp);
            });
    },

    destroy(req, res) {
        const { id } = req.params;
        return TbUser
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(user => {
                if (!user) {
                    const resp = Response(202, {}, `El usuario con id ${id} no fue encontrado.`);
                    return res.status(202).json(resp);
                } else {
                    return user
                        .update({ deleteAt: true }, { fields: ["deleteAt"] })
                        .then(() => {
                            const resp = Response(200, {}, []);
                            return res.status(200).json(resp);
                        }).catch(error => res.status(400).send(error));
                }
            })
            .catch(e => {
                const resp = Response(202, {}, `Ocurrió un error interno.`);
                return res.status(202).json(resp);
            });
    },

    searchUsers
}