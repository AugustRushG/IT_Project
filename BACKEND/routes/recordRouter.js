const express = require("express")
const dataRouter = express.Router()
const dataController = require('../controllers/dataController')
//const isAuthenticated = require('../middleware')

dataRouter.get('/dashboard',dataController.getAllData)
module.exports = dataRouter;
