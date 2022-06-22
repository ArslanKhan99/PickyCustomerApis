'use strict';
const express = require('express');
const {
    seller_details,
    seller_products,
    seller_sale_products
} = require('../controllers/vendorController.js');
const Joi = require("joi");
const validateQuery = require("../middleware/validateRequestQuery.js");


const router = express.Router();

router.get('/seller_details', sellerIdSchema, seller_details);

router.get('/seller_products', sellerIdSchema, seller_products);

router.get('/seller_sale_products', sellerIdSchema, seller_sale_products);


function sellerIdSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number().required(),
    });
    validateQuery(req, next, schema);
}

module.exports = router;