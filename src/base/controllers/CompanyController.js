import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

import models from "../../models/index";
let TbCompany = models.TbCompany;
let TbUser = models.TbUser;
let TbAddress = models.TbAddress;
let TbWarehouse = models.TbWarehouse;

import Response from "../../utils/response";
import {
    updatedAt,
    createdUpdateAt,
    cleanExtraData
} from "../../utils/utils";

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * size : 1;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: companies } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, companies, totalPages, currentPage };
};

async function create (req, res) {
    const transaction = await models.sequelize.transaction();
    try{        
        const data = { ...req.body, id: uuidv4(), ...createdUpdateAt() };
        const newCompany = await TbCompany.create(data, {
            transaction,
            include: ["address"]
        });

        await TbWarehouse.create({
            id: uuidv4(),
            name: "Warehouse",
            companyId: newCompany.id,
            predetermined: true
        }, {
            transaction
        });
        
        // Confirmar la transacción
        await transaction.commit();

        if (newCompany) {
            const company = cleanExtraData(newCompany.dataValues);
            const resp = Response(200, { company }, []);
            return res.status(200).json(resp);
        } else {
            const resp = Response(202, {}, { error: "Ocurrió un error creando la compañía." });
            return res.status(202).json(resp);
        }
    }catch(err){
        await transaction.rollback();
        const resp = Response(202, {}, { error: "Ocurrió un error creando la compañía" });
        return res.status(202).json(resp);
    }
}

module.exports = {
    create,

    list(req, res) {
        const { page, size, code } = req.query;

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

        TbCompany.findAndCountAll({
            ...options,
            include: [
                {
                    model: TbAddress,
                    as: "address",
                    required: false,
                    where: {
                        deleteAt: false
                    }
                },
                {
                    model: TbUser,
                    as: "users",
                    required: false,
                    where: {
                        deleteAt: false
                }
            }],
            attributes: { exclude: ['updatedAt', 'deleteAt'] }
         })
        .then(data => {
            const response = getPagingData(data, page, limit);
            const resp = Response(200, { companies: response }, "");
            return res.status(200).json(resp);
        })
        .catch(err => {
            const resp = Response(500, {}, `Ocurrió un error interno`);
            return res.status(500).json(resp);
        });
    },

    retrieve(req, res) {
        const { id } = req.params;
        return TbCompany
            .findOne({
                include: [
                {
                    model: TbAddress,
                    as: "address",
                    required: false,
                    where: {
                        deleteAt: false
                    }
                },
                {
                    model: TbUser,
                    as: "users",
                    required: false,
                    where: {
                        deleteAt: false
                    }
                }],
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(company => {
                if (!company) {
                    const resp = Response(202, {}, { error: `No existe la compañía asociada al id ${id}` });
                    return res.status(202).json(resp);
                } else {
                    const resp = Response(200, { company }, []);
                    return res.status(200).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, { error: `Ocurrió un error obteniendo la compañía asociada al id ${id}` });
                return res.status(202).json(resp);
            });
    },

    update(req, res) {
        const { id } = req.params;
        return TbCompany
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(company => {
                if (company) {
                    const data = { ...req.body, ...updatedAt() };
                    return company
                        .update(data, { fields: _.keys(data) })
                        .then(() => {
                            const resp = Response(200, { company }, "");
                            return res.status(200).json(resp);
                        }).catch((e) => {
                            const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                            return res.status(202).json(resp);
                        });
                } else {
                    const resp = Response(202, {}, { error: `La compañía con id ${id} no fue encontrada.` });
                    return res.status(202).json(resp);
                }
            }).catch((e) => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    },

    destroy(req, res) {
        const { id } = req.params;
        return TbCompany
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(company => {
                if (!company) {
                    const resp = Response(202, {}, { error: `La compañía con id ${id} no fue encontrada.` });
                    return res.status(202).json(resp);
                } else {
                    return company
                        .update({ deleteAt: true }, { fields: ["deleteAt"] })
                        .then(() => {
                            const resp = Response(200, {}, []);
                            return res.status(200).json(resp);
                        }).catch(error => res.status(400).send(error));
                }
            })
            .catch(e => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    }
}