const Record = require('../models/record')
const Users = require('../models/user')

const addData = async (req, res, next) => {
    try {
        const user = await Users.find({username:req.params.userName})
        const newRecord = new Record({userID: user._id});
        newRecord.money = req.body.expend;
        newRecord.classification = req.body.class;
        newRecord.description = req.body.des;
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
        if (req.body.cexpend != null){
            records.money = req.body.cexpend;
        }
        if(req.body.cclass != null){
            records.classification = req.body.cclass;
        }
        if(req.body.cdes != null){
            records.description = records.classification;
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