import _ from "lodash";
import models from "../../models/index";
let TbAddress = models.TbAddress;
let TbUser = models.TbUser;

import Response from "../../utils/response";
import { getOffset, updatedAt, createdUpdateAt, cleanExtraData } from "../../utils/utils";

module.exports = {
    create(req, res) {
        const data = { ...req.body, ...createdUpdateAt() };
        return TbAddress
            .create(data, { fields: _.keys(data) })
            .then(newAddress => {
                if (newAddress) {
                    let address = cleanExtraData(newAddress.dataValues);
                    const resp = Response(200, { address }, []);
                    return res.status(200).json(resp);
                } else {
                    const resp = Response(202, {}, { error: "Ocurrió un error creando la dirección." });
                    return res.status(202).json(resp);
                }
            }).catch(e => {
                const msg = _.get(e.original, ["detail"], "Ocurrió un error creando la dirección");
                const resp = Response(202, {}, { error: msg });
                return res.status(202).json(resp);
            });
    },

    list(req, res) {
        const { page, limit } = req.query;
        const options = {
            offset: getOffset(page, limit),
            limit: (!_.isUndefined(limit) ? limit : 20),
            order: [['createdAt', 'DESC']]
        }
        return TbAddress
            .findAll({
                ...options,
                attributes: { exclude: ['updatedAt', 'deleteAt'] }, where: {
                    deleteAt: false
                }
            })
            .then(listAddress => {
                if (listAddress) {
                    const resp = Response(200, { address: listAddress }, []);
                    return res.status(200).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    },

    getAddressByUser(req, res) {
            const { id } = req.params;
            return TbUser.findOne({
                include: [
                    {
                        model: TbAddress,
                        as: "address",
                        required: false,
                        where: {
                            deleteAt: false
                        },
                        include: ["country", "state"]
                    }
                ],
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'deleteAt']
                }, where: {
                    id,
                    deleteAt: false
                }
            }).then(user => {
                if (user) {
                    const resp = Response(200, { address: user?.address }, []);
                    return res.status(200).json(resp);
                }else {
                    const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                    return res.status(202).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    },

    retrieve(req, res) {
        const { id } = req.params;
        return TbAddress
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(address => {
                if (!address) {
                    const resp = Response(202, {}, { error: `No existe la dirección asociado al id ${id}` });
                    return res.status(202).json(resp);
                } else {
                    const resp = Response(200, { address }, []);
                    return res.status(200).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, { error: `Ocurrió un error obteniendo la dirección asociado al id ${id}` });
                return res.status(202).json(resp);
            });
    },

    update(req, res) {
        const { id } = req.params;
        return TbAddress
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(address => {
                if (address) {
                    const data = { ...req.body, ...updatedAt() };
                    return address
                        .update(data, { fields: _.keys(data) })
                        .then(() => {
                            const resp = Response(200, { address }, "");
                            return res.status(200).json(resp);
                        }).catch((e) => {
                            const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                            return res.status(202).json(resp);
                        });
                } else {
                    const resp = Response(202, {}, { error: `La dirección con id ${id} no fue encontrada.` });
                    return res.status(202).json(resp);
                }
            }).catch((e) => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    },

    destroy(req, res) {
        const { id } = req.params;
        return TbAddress
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(address => {
                if (!address) {
                    const resp = Response(202, {}, { error: `La dirección con id ${id} no fue encontrada.` });
                    return res.status(202).json(resp);
                } else {
                    return address
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