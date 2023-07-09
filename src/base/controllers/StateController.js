import _ from "lodash";
import models from "../../models/index";
let NmState = models.NmState;

import Response from "../../utils/response";
import { getOffset, updatedAt, createdUpdateAt, cleanExtraData } from "../../utils/utils";

module.exports = {
    create(req, res) {
        const data = { ...req.body, ...createdUpdateAt() };
        return NmState
            .create(data, { fields: _.keys(data) })
            .then(newState => {
                if (newState) {
                    let state = cleanExtraData(newState.dataValues);
                    const resp = Response(200, { state }, []);
                    return res.status(200).json(resp);
                } else {
                    const resp = Response(202, {}, { error: "Ocurrió un error guardando el estado." });
                    return res.status(202).json(resp);
                }
            }).catch(e => {
                const msg = _.get(e.original, ["detail"], "Ocurrió un error guardando el estado.");
                const resp = Response(202, {}, { error: msg });
                return res.status(202).json(resp);
            });
    },

    list(req, res) {
        const { page, limit, countryId } = req.query;
        const options = {
            offset: getOffset(page, limit),
            limit: (!_.isUndefined(limit) ? limit : 200),
        }
        let _where = { deleteAt: false };
        if (countryId) _where = { ..._where, countryId };
        return NmState
            .findAll({ ...options, attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: _where })
            .then(listState => {
                if (listState) {
                    const resp = Response(200, { states: listState }, []);
                    return res.status(200).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    },

    retrieve(req, res) {
        const { id } = req.params;
        if (id) {
            return NmState
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(state => {
                    if (!state) {
                        const resp = Response(202, [], { error: `No existe el estado asociada al id ${id}` });
                        return res.status(202).json(resp);
                    } else {
                        const resp = Response(200, { state }, []);
                        return res.status(200).json(resp);
                    }
                })
                .catch(e => {
                    const resp = Response(202, {}, { error: `Ocurrió un error obteniendo el estado asociado al id ${id}` });
                    return res.status(202).json(resp);
                });
        } else {
            const resp = Response(202, {}, { error: `Debe enviar el id` });
            return res.status(202).json(resp);
        }
    },

    update(req, res) {
        const { id } = req.params;
        if (id) {
            return NmState
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(state => {
                    if (state) {
                        const data = { ...req.body, ...updatedAt() };
                        return state
                            .update(data, { fields: _.keys(data) })
                            .then(() => {
                                const resp = Response(200, { state }, []);
                                return res.status(200).json(resp);
                            }).catch((e) => {
                                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                                return res.status(202).json(resp);
                            });
                    } else {
                        const resp = Response(202, {}, { error: `El estado con id ${id} no fue encontrado.` });
                        return res.status(202).json(resp);
                    }
                }).catch((e) => {
                    const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                    return res.status(202).json(resp);
                });
        } else {
            const resp = Response(202, {}, { error: `Debe enviar el id` });
            return res.status(202).json(resp);
        }
    },

    destroy(req, res) {
        const { id } = req.params;
        if (id) {
            return NmState
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(state => {
                    if (!state) {
                        const resp = Response(202, {}, { error: `El estado con id ${id} no fue encontrado.` });
                        return res.status(202).json(resp);
                    } else {
                        return state
                            .update({ deleteAt: true }, { fields: ["deleteAt"] })
                            .then(() => {
                                const resp = Response(200, {}, []);
                                return res.status(200).json(resp);
                            }).catch(e => {
                                const resp = Response(202, {}, { error: `El estado con id ${id} no fue encontrado.` });
                                return res.status(202).json(resp);
                            });
                    }
                })
                .catch(e => {
                    const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                    return res.status(202).json(resp);
                });
        } else {
            const resp = Response(202, {}, { error: `Debe enviar el id` });
            return res.status(202).json(resp);
        }
    }
}