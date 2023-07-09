import _ from "lodash";
import models from "../../models/index";
let TbUser = models.TbUser;
let TbAddress = models.TbAddress;
let TbCompany = models.TbCompany;

import {
    generateHash,
    compareHash,
    createdUpdateAt,
    updatedAt,
    cleanExtraData
} from "../../utils/utils";

import { generateToken, verifyToken } from "../../utils/token";
import Response from "../../utils/response";
import { getUserById } from '../services/UserService';
import { registerUserInCompany } from '../services/UserCompanyService';

export async function signIn(req, res) {
    let { userData, companyData } = req.body;
    const { password } = userData;
    const { companyId, role } = companyData;
    const passwordHash = await generateHash(password);
    const data = { ...userData, password: passwordHash, ...createdUpdateAt() };
    try {
        const newUser = await TbUser.create(data);
        if (newUser) {
            let user = await cleanExtraData(newUser.dataValues);
            const userCompany = await registerUserInCompany({ userId: user.id, companyId, role });
            const resp = Response(200, { user }, "");
            return res.status(200).json(resp);
        } else {
            const resp = Response(202, {}, "Ocurrió un error creando el usuario.");
            return res.status(202).json(resp);
        }
    } catch (e) {
        const resp = Response(202, {}, "Ocurrió un error creando el usuario");
        return res.status(202).json(resp);
    }
}

/**
 * @description Login de usuarios
 * @param {email}
 * @param {password}
*/
exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await TbUser.findOne({
        include: [
            {
                model: TbAddress,
                as: "address",
                required: false,
                where: {
                    deleteAt: false
                },
                include: ["country", "state"]
            }, {
                model: TbCompany,
                as: "companies",
                required: false,
                where: {
                    deleteAt: false
                }
            }
        ],
        attributes: {
            exclude: ['updatedAt', 'createdAt', 'deleteAt']
        }, where: {
            email,
            deleteAt: false
        }
    });
    if (user === null) {
        const resp = Response(202, {}, "Usuario no registrado.");
        return res.status(202).json(resp);
    } else {
        const compare = await compareHash(password, user.password);
        if (compare) {
            const token = await generateToken({ id: user.id });
            if (token !== null) {
                const resp = Response(200, { user: user.dataValues, token }, "");
                return res.status(200).json(resp);
            } else {
                const resp = Response(202, {}, "El correo o la contraseña es incorrecta.");
                return res.status(202).json(resp);
            }
        } else {
            const resp = Response(202, {}, "El correo o la contraseña es incorrecta.");
            return res.status(202).json(resp);
        }
    }
}

exports.validateToken = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization !== undefined) {
            const token = await verifyToken(authorization);
            if (token !== null) {
                let user = await TbUser.findOne({
                    include: ["address"], attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                        id: token.id,
                        deleteAt: false
                    }
                });
                user = await cleanExtraData(user.dataValues);
                const newToken = await generateToken({ id: user.id });
                if (user.addressId) {
                    delete user.addressId;
                }
                const resp = Response(200, { user, token: newToken }, "");
                return res.status(200).json(resp);
            } else {
                const resp = Response(202, { token: false }, "");
                return res.status(202).json(resp);
            }
        } else {
            const resp = Response(202, {}, "No ha enviado el token.");
            return res.status(202).json(resp);
        }
    } catch (e) {
        const resp = Response(202, {}, "Ocurrió un error actualizando el token.");
        return res.status(202).json(resp);
    }
}

exports.changePassword = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization !== undefined) {
            const token = await verifyToken(authorization);
            if (token !== null) {
                const { oldPassword, newPassword } = req.body;
                const user = await getUserById(token.id);
                const compare = await compareHash(oldPassword, user.password);
                if (compare) {
                    const passwordHash = await generateHash(newPassword);
                    const data = { password: passwordHash, ...updatedAt() };
                    return TbUser
                        .findOne({
                            where: {
                                id: token.id,
                                deleteAt: false
                            }
                        })
                        .then(user => {
                            if (user) {
                                return user
                                    .update(data, { fields: _.keys(data) })
                                    .then(() => {
                                        const resp = Response(200, { change: true }, {});
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
                } else {
                    const resp = Response(200, { change: false }, {});
                    return res.status(200).json(resp);
                }
            } else {
                const resp = Response(200, { token: false }, "");
                return res.status(200).json(resp);
            }
        } else {
            const resp = Response(202, {}, "No ha enviado el token.");
            return res.status(202).json(resp);
        }
    } catch (e) {
        const resp = Response(202, {}, "No se pudo cambiar la contraseña, intente más tarde.");
        return res.status(202).json(resp);
    }
}

exports.profile = async (req, res) => {
    const { id } = req.params;
    if (id) {
        return TbUser
            .findOne({
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'deleteAt']
                }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(async user => {
                if (user) {
                    let data = { ...req.body, ...updatedAt() };
                    return user
                        .update(data, {
                            include: ["address"]
                        })
                        .then(() => {
                            const resp = Response(200, { user }, "");
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
                return res.status(500).json(resp);
            });
    } else {
        const resp = Response(202, {}, `Debe enviar el id`);
        return res.status(202).json(resp);
    }
}

exports.changeEmail = async (req, res) => {
    const { id } = req.params;
    if (id) {
        return TbUser
            .findOne({
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'deleteAt']
                }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(async user => {
                if (user) {
                    let data = { ...req.body, ...updatedAt() };
                    return user
                        .update(data)
                        .then(newUser => {
                            const resp = Response(200, { user: newUser }, "");
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
                return res.status(500).json(resp);
            });
    } else {
        const resp = Response(202, {}, `Debe enviar el id`);
        return res.status(202).json(resp);
    }
}