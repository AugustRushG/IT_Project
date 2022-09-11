const Record = require('../models/record')
const Users = require('../models/user')

const addData = async (req, res, next) => {
    try {
        const user = await Users.find({username:req.params.userName})
        const newRecord = new Record({userID: user._id});
        newRecord.idx = req.body.id;
        newRecord.date = req.body.date;
        newRecord.money = req.body.money;
        newRecord.classification = req.body.classification;
        newRecord.description = req.body.notes;
        newRecord.save();
        return res.json({msg:"success"});
    } catch (err) {
        return next(err)
    }
}

const getAllData = async (req, res, next) => {
    try {
        const user = await Users.find({username:req.params.userName})
        const records = await Record.find({userID: user._id}).lean()
        if (records === null) {
            return res.status(404).json({msg:"No records!"});
        }
        return res.json({data: records})
    } catch (err) {
        return next(err)
    }
}

const editData = async (req, res, next) => {
    try {
        const records = await Record.find({_id: req.body.rid})
        if (records === null) {
            return res.status(404).json({msg:"No records!"});
        }
        if (req.body.money != null){
            records.money = req.body.money;
        }
        if(req.body.classification != null){
            records.classification = req.body.classification;
        }
        if(req.body.notes != null){
            records.description = req.body.notes ;
        }
        records.save();
        return res.json({data: records})
    } catch (err) {
        return next(err)
    }
}

const deleteData = async (req, res, next) => {
    try {
        const result = await Record.deleteOne({_id: req.body.rid})
        return res.sent(result)
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    addData,
    getAllData,
    editData,
    deleteData
}