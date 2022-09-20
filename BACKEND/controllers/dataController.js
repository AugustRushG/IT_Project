const record = require('../models/record');
const Record = require('../models/record')
const Users = require('../models/user')

const addData = async (req, res, next) => {
    try {
        const user = await Users.findOne({username:req.body.user})
        const newRecord = new Record({userId:user._id});
        var dateString = req.body.day.split("-");
        dateString[1] = dateString[1] - 1;
        if((dateString[1]+'').length == 1){
            dateString[1] = '0' + dateString[1];
        }
        newRecord.date = dateString[1] + ' ' + dateString[2] + ' ' + dateString[0];
        newRecord.money = req.body.money;
        newRecord.classification = req.body.category;
        newRecord.description = req.body.description;
        newRecord.save();
        return res.json({msg:"success"});
    } catch (err) {
        return next(err)
    }
}

const getAllData = async (req, res, next) => {
    try {
        const user = await Users.findOne({username:req.params.user});
        const records = await Record.find({userId: user._id}).lean();
        if (records === null) {
            return res.status(404).json({msg:"No records!"});
        }
        return res.json({data: records});
    } catch (err) {
        return next(err);
    }
}

const getMonthData = async (req, res, next) => {
    try {
        const user = await Users.find({username:req.params.userName});
        const totalRecords = await Record.find({userID: user._id}).lean();
        const reqMonth = req.body.month - 1;
        const reqYear = req.body.year;
        var pattern = "#reqMonth code\n123 #reqYear";
        const records = await totalRecords.find({date:{$regex:patern}});
        if (records === null) {
            return res.status(404).json({msg:"No records!"});
        }
        var expend, income;
        for(record in records){
            if(record.money < 0){
                expend += record.money;
            }else{
                income += record.money;
            }
        }
        return res.json({expend: expend, income: income})
    } catch (err) {
        return next(err)
    }
}

const editData = async (req, res, next) => {
    try {
        const record = await Record.findOne({_id: req.body.recordID})
        if (record === null) {
            return res.status(404).json({msg:"No records!"});
        }
        if (req.body.day === null){
            var dateString = req.body.day.split("-");
            dateString[1] = dateString[1] - 1;
            if((dateString[1]+'').length == 1){
                dateString[1] = '0' + dateString[1];
            }
        }
        record.money = req.body.money;
        record.classification = req.body.category;
        record.description = req.body.description;
        record.save();
        return res.json({data: record})
    } catch (err) {
        return next(err)
    }
}

const deleteData = async (req, res, next) => {
    try {
        const result = await Record.deleteOne({_id: req.body.id})
        return res.send(result)
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