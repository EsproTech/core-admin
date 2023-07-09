import models from "../../models/index";
let TbUser = models.TbUser;
let TbAddress = models.TbAddress;
let NmCountry = models.NmCountry;
let NmState = models.NmState;

const getUserById = (id) => {
    return TbUser
        .findOne({
            where: {
                id,
                deleteAt: false
            }
        })
        .then(async (user) => {
            if (!user) {
                return null;
            } else {
                return user;
            }
        })
        .catch(e => {
            return null;
        });
}

const getAddressByUserId = async (id) => {
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
            }
        ],
        attributes: {
            exclude: ['updatedAt', 'createdAt', 'deleteAt']
        }, where: {
            id,
            deleteAt: false
        }
    });
    return user;
}

module.exports = {
    getUserById,
    getAddressByUserId
}