const express = require('express');
const {
    getToken,
    braintree_payment
} = require('../controllers/braintreeController.js');

const {auth} = require('../middleware/auth.js');
const Joi = require("joi");
const validateRequestQuery = require("../middleware/validateRequestQuery.js");
const validateRequest = require("../middleware/validateRequest.js");


const router = express.Router();

router.get('/braintree_token', auth, getToken);

router.post('/braintree_payment', auth, validatePaymentSchema, braintree_payment);


function validatePaymentSchema(req, res, next) {
    const schema = Joi.object({
        amount: Joi.number().required(),
        order_id: Joi.number().required(),
        nonce: Joi.string().required()
    });
    validateRequestQuery(req, next, schema);
}

module.exports = router;