const Record = require('../models/record')
const Users = require('../models/user')

const getAllData = async (req, res, next) => {
    try {
        const records = await Record.find({userID:req.params.user_id})
        if (records === null) {
            return res.status(404).json({mst:"No records!"});
        }
        return res.json( {data: records})
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getAllData
}