import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

import models from "../../models/index";
let TbOrderSale = models.TbOrderSale;

import Response from "../../utils/response";
import {
    updatedAt,
    createdUpdateAt,
    cleanExtraData
} from "../../utils/utils";

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * size : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: ordersales } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, ordersales, totalPages, currentPage };
};

module.exports = {
    create(req, res) {
        const data = { ...req.body, id: uuidv4(),...createdUpdateAt() };
        return TbOrderSale
            .create(data).then(newCustomer => {
                if (newOrderSale) {
                    const ordersale = cleanExtraData(newOrderSale.dataValues);
                    const resp = Response(200, { ordersale }, []);
                    return res.status(200).json(resp);
                } else {
                    const resp = Response(202, {}, { error: "Ocurrió un error creando la orden de venta." });
                    return res.status(202).json(resp);
                }
            }).catch(e => {
                const resp = Response(202, {}, { error: "Ocurrió un error interno." });
                return res.status(202).json(resp);
            });
    },

    list(req, res) {
        const { page, size, customer } = req.query;

        const { limit, offset } = getPagination(page, size);

        const options = {
            where: {
                deleteAt: false
            },
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }

        TbOrderSale.findAndCountAll({
            ...options,
            attributes: { exclude: ['updatedAt', 'deleteAt'] }
         })
        .then(data => {
            const response = getPagingData(data, page, limit);
            const resp = Response(200, { customers: response }, "");
            return res.status(200).json(resp);
        })
        .catch(err => {
            const resp = Response(500, {}, `Ocurrió un error interno`);
            return res.status(500).json(resp);
        });
    },

    retrieve(req, res) {
        const { id } = req.params;
        return TbOrderSale
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(ordersale => {
                if (!ordersale) {
                    const resp = Response(202, {}, { error: `No existe la orden de venta asociada al id ${id}` });
                    return res.status(202).json(resp);
                } else {
                    const resp = Response(200, { ordersale }, []);
                    return res.status(200).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno` });
                return res.status(202).json(resp);
            });
    },

    update(req, res) {
        const { id } = req.params;
        return TbOrderSale
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(ordersale => {
                if (ordersale) {
                    const data = { ...req.body, ...updatedAt() };
                    return ordersale
                        .update(data, { fields: _.keys(data) })
                        .then(() => {
                            const resp = Response(200, { ordersale }, "");
                            return res.status(200).json(resp);
                        }).catch((e) => {
                            const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                            return res.status(202).json(resp);
                        });
                } else {
                    const resp = Response(202, {}, { error: `La orden con id ${id} no fue encontrado.` });
                    return res.status(202).json(resp);
                }
            }).catch((e) => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    },

    destroy(req, res) {
        const { id } = req.params;
        return TbOrderSale
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(ordersale => {
                if (!ordersale) {
                    const resp = Response(202, {}, { error: `La orden con id ${id} no fue encontrada.` });
                    return res.status(202).json(resp);
                } else {
                    return ordersale
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