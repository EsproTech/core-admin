import _ from "lodash";

import models from "../../models/index";
let NmNotification = models.NmNotification;
let TbUser = models.TbUser;

import Response from "../../utils/response";
import { getOffset, updatedAt, createdUpdateAt, cleanExtraData } from "../../utils/utils";

module.exports = {
    create(req, res) {
        const data = { ...req.body, ...createdUpdateAt() };
        return NmNotification
            .create(data, { fields: _.keys(data) })
            .then(newNotification => {
                if (newNotification) {
                    let notification = cleanExtraData(newNotification.dataValues);
                    const resp = Response(200, { notification }, []);
                    return res.status(200).json(resp);
                } else {
                    const resp = Response(202, {}, { error: "Ocurrió un error guardando la notificación." });
                    return res.status(202).json(resp);
                }
            }).catch(e => {
                const msg = _.get(e.original, ["detail"], "Ocurrió un error guardando la notificación.");
                const resp = Response(202, {}, { error: msg });
                return res.status(202).json(resp);
            });
    },

    list(req, res) {
        const { page, limit } = req.query;
        const options = {
            offset: getOffset(page, limit),
            limit: (!_.isUndefined(limit) ? limit : 20),
        }
        return NmNotification
            .findAll({
                ...options, include: [{
                    model: TbUser,
                    as: "users",
                    attributes: ["id", "firstName", "lastName", "email"],
                    through: {
                        attributes: [],
                    }
                }], attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    deleteAt: false
                }
            })
            .then(listNotification => {
                if (listNotification) {
                    const resp = Response(200, { notifications: listNotification }, []);
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
            return NmNotification
                .findOne({
                    include: ["users"], attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(notification => {
                    if (!notification) {
                        const resp = Response(202, {}, { error: `No existe la notificación asociada al id ${id}` });
                        return res.status(202).json(resp);
                    } else {
                        const resp = Response(200, { notification }, []);
                        return res.status(200).json(resp);
                    }
                })
                .catch(e => {
                    const resp = Response(202, {}, { error: `Ocurrió un error obteniendo la notificación asociado al id ${id}` });
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
            return NmNotification
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(notification => {
                    if (notification) {
                        const data = { ...req.body, ...updatedAt() };
                        return notification
                            .update(data, { fields: _.keys(data) })
                            .then(() => {
                                const resp = Response(200, { notification }, []);
                                return res.status(200).json(resp);
                            }).catch((e) => {
                                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                                return res.status(202).json(resp);
                            });
                    } else {
                        const resp = Response(202, {}, { error: `La notificación con id ${id} no fue encontrada.` });
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
            return NmNotification
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(notification => {
                    if (!notification) {
                        const resp = Response(202, {}, { error: `La notificación con id ${id} no fue encontrada.` });
                        return res.status(202).json(resp);
                    } else {
                        return notification
                            .update({ deleteAt: true }, { fields: ["deleteAt"] })
                            .then(() => {
                                const resp = Response(200, {}, []);
                                return res.status(200).json(resp);
                            }).catch(e => {
                                const resp = Response(202, {}, { error: `La notificación con id ${id} no fue encontrada.` });
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
    },

    addUser(req, res) {
        const { userId, notificationId } = req.body;
        return NmNotification
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    notificationId,
                    deleteAt: false
                }
            })
            .then((notification) => {
                if (!notification) {
                    const resp = Response(202, {}, { error: `notificación con id ${id} no fue encontrada.` });
                    return res.status(202).json(resp);
                }
                return TbUser.findByPk(userId).then((user) => {
                    if (!user) {
                        const resp = Response(202, {}, { error: `El usuario con id ${id} no fue encontrado.` });
                        return res.status(202).json(resp);
                    }
                    notification.addUser(user);
                    const resp = Response(200, { notification }, []);
                    return res.status(200).json(resp);
                });
            }).catch((e) => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    }
}