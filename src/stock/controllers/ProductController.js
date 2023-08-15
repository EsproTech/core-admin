import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

import models from "../../models/index";
let TbProduct = models.TbProduct;
let TbWarehouse = models.TbWarehouse;
let TbProductWarehouse = models.TbProductWarehouse;

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
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, products, totalPages, currentPage };
};

async function create (req, res) {
    const transaction = await models.sequelize.transaction();
    try{
        const { companyId, unitId } = req.body;
        if(!companyId){
            const resp = Response(202, {}, { error: "La compañía es obligatoria." });
            return res.status(202).json(resp);
        }
        if(!unitId){
            const resp = Response(202, {}, { error: "La compañía es obligatoria." });
            return res.status(202).json(resp);
        }
        const data = { ...{
            name: req.body?.name,
            image: req.body?.image || '',
            typeProduct: req.body?.typeProduct,
            bardcode: req.body?.bardcode || '',
            costPrice: req.body?.costPrice || 0.0,
            salePrice: req.body?.salePrice || 0.0,
            minimalExistence: req.body?.salePrice || 1,
            visibility: req.body?.visibility,
            description: req.body?.description,
            categoryId: req.body?.categoryId,
            companyId: req.body?.companyId,
            unitId: req.body?.unitId,
        }, id: uuidv4(), ...createdUpdateAt() };
        const product = await TbProduct.create(data, {
            transaction
        });

        // Obtener el id del almacen principal de la compañìa
        const warehouseCompany = await TbWarehouse.findOne({
            companyId: companyId,
            predetermined: true,
        }, {
            transaction
        });

        await TbProductWarehouse.create({
            id: uuidv4(),            
            availability: req.body?.availability || 0,
            productId: product.id,
            warehouseId: warehouseCompany.id
        }, {
            transaction
        });
        
        // Confirmar la transacción
        await transaction.commit();

        if (product) {
            const _product = cleanExtraData(product.dataValues);
            const resp = Response(200, { product: _product }, []);
            return res.status(200).json(resp);
        } else {
            const resp = Response(202, {}, { error: "Ocurrió un error creando el producto." });
            return res.status(202).json(resp);
        }
    }catch(err){
        await transaction.rollback();
        const resp = Response(202, {}, { error: "Ocurrió un error creando el producto" });
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
                deleteAt: false
            },
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }

        TbProduct.findAndCountAll({
            ...options,
            attributes: { exclude: ['updatedAt', 'deleteAt'] }
         })
        .then(data => {
            const response = getPagingData(data, page, limit);
            const resp = Response(200, { products: response }, "");
            return res.status(200).json(resp);
        })
        .catch(err => {
            const resp = Response(500, {}, `Ocurrió un error interno`);
            return res.status(500).json(resp);
        });
    },

    retrieve(req, res) {
        const { id } = req.params;
        return TbProduct
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(product => {
                if (!product) {
                    const resp = Response(202, {}, { error: `No existe el producto asociado al id ${id}` });
                    return res.status(202).json(resp);
                } else {
                    const resp = Response(200, { product }, []);
                    return res.status(200).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, { error: `Ocurrió un error obteniendo el producto asociado al id ${id}` });
                return res.status(202).json(resp);
            });
    },

    update(req, res) {
        const { id } = req.params;
        return TbProduct
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(product => {
                if (product) {
                    const data = { ...req.body, ...updatedAt() };
                    return product
                        .update(data, { fields: _.keys(data) })
                        .then(() => {
                            const resp = Response(200, { product }, "");
                            return res.status(200).json(resp);
                        }).catch((e) => {
                            const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                            return res.status(202).json(resp);
                        });
                } else {
                    const resp = Response(202, {}, { error: `El producto con id ${id} no fue encontrado.` });
                    return res.status(202).json(resp);
                }
            }).catch((e) => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    },

    destroy(req, res) {
        const { id } = req.params;
        return TbProduct
            .findOne({
                attributes: { exclude: ['updatedAt', 'createdAt', 'deleteAt'] }, where: {
                    id,
                    deleteAt: false
                }
            })
            .then(product => {
                if (!product) {
                    const resp = Response(202, {}, { error: `El producto con id ${id} no fue encontrado.` });
                    return res.status(202).json(resp);
                } else {
                    return product
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