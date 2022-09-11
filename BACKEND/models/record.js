const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    idx: {type: Number, required: true},
    date: { type: String, required: true},
    classification: { type: String, required: true},
    money: { type: Number, required: true, default: 0},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 
    description: String,
})

const record = mongoose.model('Record', schema)
module.exports = record