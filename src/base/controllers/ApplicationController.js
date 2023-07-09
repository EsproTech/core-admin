import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

import models from "../../models/index";
let TbApplication = models.TbApplication;

import Response from "../../utils/response";
import { getOffset, updatedAt, createdUpdateAt, cleanExtraData } from "../../utils/utils";

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * size : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: applications } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, applications, totalPages, currentPage };
};

module.exports = {
    create(req, res) {
        const data = { ...req.body, id: uuidv4(), ...createdUpdateAt() };
        return TbApplication
            .create(data, { fields: _.keys(data) })
            .then(application => {
                if (application) {
                    const _application = cleanExtraData(application.dataValues);
                    const resp = Response(200, { application: _application }, "");
                    return res.status(200).json(resp);
                } else {
                    const resp = Response(202, {}, "Ocurrió un error guardando la aplicación.");
                    return res.status(202).json(resp);
                }
            }).catch(e => {
                const msg = _.get(e.original, ["detail"], "Ocurrió un error guardando la aplicación.");
                const resp = Response(202, {}, msg);
                return res.status(202).json(resp);
            });
    },

    list(req, res) {
        const { page, size, code } = req.query;
        const condition = code ? { code: { [Op.like]: `%${code}%` } } : null;

        const { limit, offset } = getPagination(page, size);

        const options = {
            where: {
                active: true,
                deleteAt: false,
                ...condition
            },
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }

        TbApplication.findAndCountAll({
            ...options,
            attributes: { exclude: ['updatedAt', 'deleteAt'] }
         })
        .then(data => {
            const response = getPagingData(data, page, limit);
            const resp = Response(200, { applications: response }, "");
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
            return TbApplication
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        active: true,
                        deleteAt: false
                    }
                })
                .then(application => {
                    if (!application) {
                        const resp = Response(202, {}, `No existe la aplicación asociada al id ${id}`);
                        return res.status(202).json(resp);
                    } else {
                        const resp = Response(200, { application }, []);
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
            return TbApplication
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        deleteAt: false
                    }
                })
                .then(application => {
                    if (application) {
                        const data = { ...req.body, ...updatedAt() };
                        return application
                            .update(data, { fields: _.keys(data) })
                            .then(() => {
                                const resp = Response(200, { application }, "");
                                return res.status(200).json(resp);
                            }).catch((e) => {
                                const resp = Response(202, {}, `Ocurrió un error interno.`);
                                return res.status(202).json(resp);
                            });
                    } else {
                        const resp = Response(202, {}, `La aplicación con id ${id} no fue encontrada.`);
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
            return TbApplication
                .findOne({
                    attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id,
                        active: true,
                        deleteAt: false
                    }
                })
                .then(application => {
                    if (!application) {
                        const resp = Response(202, {}, `La aplicación con id ${id} no fue encontrada.`);
                        return res.status(202).json(resp);
                    } else {
                        return application
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