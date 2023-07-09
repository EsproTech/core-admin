import _ from "lodash";

import models from "../../models/index";
let NmCountry = models.NmCountry;

import Response from "../../utils/response";
import { getOffset, updatedAt, createdUpdateAt, cleanExtraData } from "../../utils/utils";

module.exports = {
    create(req, res) {
        const data = { ...req.body, ...createdUpdateAt() };
        return NmCountry
            .create(data, { fields: _.keys(data) })
            .then(newCountry => {
                if (newCountry) {
                    let country = cleanExtraData(newCountry.dataValues);
                    const resp = Response(200, { country }, "");
                    return res.status(200).json(resp);
                } else {
                    const resp = Response(202, {}, "Ocurrió un error guardando el país.");
                    return res.status(202).json(resp);
                }
            }).catch(e => {
                const msg = _.get(e.original, ["detail"], "Ocurrió un error guardando el país.");
                const resp = Response(202, {}, msg);
                return res.status(202).json(resp);
            });
    },

    list(req, res) {
        const { page, limit } = req.query;
        const options = {
            offset: getOffset(page, limit),
            limit: (!_.isUndefined(limit) ? limit : 200),
        }
        return NmCountry
            .findAll({
                ...options, attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] },
                where: {
                    active: true,
                    deleteAt: false
                }
            })
            .then(listCountry => {
                if (listCountry) {
                    const resp = Response(200, { countries: listCountry }, "");
                    return res.status(200).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, `Ocurrió un error interno.`);
                return res.status(202).json(resp);
            });
    },

    retrieve(req, res) {
        const { id } = req.params;
        if (id) {
            return NmCountry
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        active: true,
                        deleteAt: false
                    }
                })
                .then(country => {
                    if (!country) {
                        const resp = Response(202, {}, `No existe el país asociada al id ${id}`);
                        return res.status(202).json(resp);
                    } else {
                        const resp = Response(200, { country }, []);
                        return res.status(200).json(resp);
                    }
                })
                .catch(e => {
                    const resp = Response(202, {}, `Ocurrió un error obteniendo el país asociado al id ${id}`);
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
            return NmCountry
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(country => {
                    if (country) {
                        const data = { ...req.body, ...updatedAt() };
                        return country
                            .update(data, { fields: _.keys(data) })
                            .then(() => {
                                const resp = Response(200, { country }, "");
                                return res.status(200).json(resp);
                            }).catch((e) => {
                                const resp = Response(202, {}, `Ocurrió un error interno.`);
                                return res.status(202).json(resp);
                            });
                    } else {
                        const resp = Response(202, {}, `El país con id ${id} no fue encontrado.`);
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
            return NmCountry
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        active: true,
                        deleteAt: false
                    }
                })
                .then(country => {
                    if (!country) {
                        const resp = Response(202, {}, `El país con id ${id} no fue encontrado.`);
                        return res.status(202).json(resp);
                    } else {
                        return country
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