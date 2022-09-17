const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    date: { type: String, required: true},
    classification: { type: String, required: true},
    money: { type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 
    description: String,
})

const record = mongoose.model('Record', schema)
module.exports = record