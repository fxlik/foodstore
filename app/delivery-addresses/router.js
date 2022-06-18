const router = require('express').Router()
const multer = require('multer')

const addressController = require('./controller')

router.post('/delivery-addresses', multer().none(), addressController.store)
router.put('/delivery-addresses/:id', multer().none(), addressController.update)

module.exports = router