const express = require("express")
const dataRouter = express.Router()
const dataController = require('../controllers/dataController')
const store = require('../multer')

// @all router used here: access private

// $route GET api/records/add
dataRouter.post('/add', store.single('image'), dataController.addData)

// $route GET api/records/dashboard/:user
// return: all records related to the provided user
dataRouter.get('/dashboard/:user',dataController.getAllData)

// $route GET api/records/edit
dataRouter.post('/edit',dataController.editData)

// $route GET api/records/delete
dataRouter.post('/delete',dataController.deleteData)

module.exports = dataRouter;
