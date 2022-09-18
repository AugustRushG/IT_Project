const express = require("express")
const dataRouter = express.Router()
const dataController = require('../controllers/dataController')
//const isAuthenticated = require('../middleware')

dataRouter.post('/add',dataController.addData)
dataRouter.get('/dashboard/:user',dataController.getAllData)
dataRouter.get('/edit',dataController.editData)
dataRouter.post('/delete',dataController.deleteData)

module.exports = dataRouter;
