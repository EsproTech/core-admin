import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

import models from "../../models/index";
let TbWarehouse = models.TbWarehouse;

import Response from "../../utils/response";
import { updatedAt, createdUpdateAt, cleanExtraData } from "../../utils/utils";

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * size : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: warehouses } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, warehouses, totalPages, currentPage };
};

module.exports = {
    create(req, res) {
        const data = { ...req.body, id: uuidv4(), ...createdUpdateAt() };
        return TbWarehouse
            .create(data, { fields: _.keys(data) })
            .then(warehouse => {
                if (warehouse) {
                    const _warehouse = cleanExtraData(warehouse.dataValues);
                    const resp = Response(200, { warehouse: _warehouse }, "");
                    return res.status(200).json(resp);
                } else {
                    const resp = Response(202, {}, "Ocurrió un error guardando el almacèn.");
                    return res.status(202).json(resp);
                }
            }).catch(e => {
                const msg = _.get(e.original, ["detail"], "Ocurrió un error interno.");
                const resp = Response(202, {}, msg);
                return res.status(202).json(resp);
            });
    },

    list(req, res) {
        const { page, size } = req.query;

        const { limit, offset } = getPagination(page, size);

        const options = {            
            where: {
                deleteAt: false
            },
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }

        TbWarehouse.findAndCountAll({
            ...options,
            attributes: { exclude: ['updatedAt', 'deleteAt'] }
         })
        .then(data => {
            const response = getPagingData(data, page, limit);
            const resp = Response(200, { warehouses: response }, "");
            return res.status(200).json(resp);
        })
        .catch(err => {
            const resp = Response(500, {}, `Ocurrió un error interno`);
            return res.status(500).json(resp);
        });
    },

    retrieve(req, res) {
        const { id } = req.params;
        if (id) {
            return TbWarehouse
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(warehouse => {
                    if (!warehouse) {
                        const resp = Response(202, {}, `No existe el almacèn asociado al id ${id}`);
                        return res.status(202).json(resp);
                    } else {
                        const resp = Response(200, { warehouse }, []);
                        return res.status(200).json(resp);
                    }
                })
                .catch(e => {
                    const resp = Response(202, {}, `Ocurrió un error obteniendo el almacèn asociada al id ${id}`);
                    return res.status(202).json(resp);
                });
        } else {
            const resp = Response(202, {}, `Debe enviar el id`);
            return res.status(202).json(resp);
        }
    },

    update(req, res) {
        const { id } = req.params;
        if (id) {
            return TbWarehouse
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(warehouse => {
                    if (warehouse) {
                        const data = { ...req.body, ...updatedAt() };
                        return warehouse
                            .update(data, { fields: _.keys(data) })
                            .then(() => {
                                const resp = Response(200, { warehouse }, "");
                                return res.status(200).json(resp);
                            }).catch((e) => {
                                const resp = Response(202, {}, `Ocurrió un error interno.`);
                                return res.status(202).json(resp);
                            });
                    } else {
                        const resp = Response(202, {}, `El almacèn con id ${id} no fue encontrado.`);
                        return res.status(202).json(resp);
                    }
                }).catch((e) => {
                    const resp = Response(202, {}, `Ocurrió un error interno.`);
                    return res.status(500).json(resp);
                });
        } else {
            const resp = Response(202, {}, `Debe enviar el id`);
            return res.status(202).json(resp);
        }
    },

    destroy(req, res) {
        const { id } = req.params;
        if (id) {
            return TbWarehouse
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(warehouse => {
                    if (!warehouse) {
                        const resp = Response(202, {}, `El almacèn con id ${id} no fue encontrado.`);
                        return res.status(202).json(resp);
                    } else {
                        return warehouse
                            .update({ deleteAt: true }, { fields: ["deleteAt"] })
                            .then(() => {
                                const resp = Response(200, {}, []);
                                return res.status(200).json(resp);
                            }).catch((e) => {
                                const resp = Response(202, {}, `Ocurrió un error interno.`);
                                return res.status(202).json(resp);
                            });
                    }
                })
                .catch(e => {
                    const resp = Response(202, {}, `Ocurrió un error interno.`);
                    return res.status(202).json(resp);
                });
        } else {
            const resp = Response(202, {}, `Debe enviar el id`);
            return res.status(202).json(resp);
        }
    }
}