import _ from "lodash";
import models from "../../models/index";
let TbCompanyUser = models.TbCompanyUser;
import { createdUpdateAt } from "../../utils/utils";

const registerUserInCompany = ({companyId, userId, role}) => {
    const data = { companyId, userId, role, active: true, ...createdUpdateAt() };
    return TbCompanyUser
        .create(data, { fields: _.keys(data) })
        .then(userCompany => {
            if (userCompany) {
                return true;
            } else {
                return false;
            }
        }).catch(e => {
            return false;
        });
}

module.exports = {
    registerUserInCompany
}