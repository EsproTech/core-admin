import _ from "lodash";
import models from "../../models/index";
let TbCompanyUser = models.TbCompanyUser

import Response from "../../utils/response";
import {
    getOffset,
} from "../../utils/utils";

module.exports = {
    list(req, res) {
        const { page, limit } = req.query;
        const options = {
            offset: getOffset(page, limit),
            limit: (!_.isUndefined(limit) ? limit : 20),
            order: [['createdAt', 'DESC']]
        }
        return TbCompanyUser
            .findAll({
                ...options,
                attributes: { exclude: ['updatedAt', 'deleteAt'] },
                where: {
                    deleteAt: false
                }
            })
            .then(listCompanyUser => {
                if (listCompanyUser) {
                    const resp = Response(200, { companyUser: listCompanyUser }, []);
                    return res.status(200).json(resp);
                }
            })
            .catch(e => {
                const resp = Response(202, {}, { error: `Ocurrió un error interno.` });
                return res.status(202).json(resp);
            });
    },
}