var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.post('', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/all', productController.getAll);
router.get('/:id', productController.getById);

module.exports = router;
