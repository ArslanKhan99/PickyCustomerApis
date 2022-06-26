const express = require('express');
const {auth} = require('../middleware/auth.js');

const {
    getSales,
    getAllSalesProducts,
} = require('../controllers/salesController.js');



const router = express.Router();

router.get('/sales', getSales);

router.get('/sale_products/:id', getAllSalesProducts);

module.exports = router;