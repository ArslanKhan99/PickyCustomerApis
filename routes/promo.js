const express = require('express');
const {auth} = require('../middleware/auth.js');
const validateQuery = require('../middleware/validateRequestQuery.js');
const Joi = require("joi");

const {
    all_promo_codes,
    claim_promo_code,
    claimed_promo_codes,
    apply_promo_code
} = require('../controllers/promoController.js');



const router = express.Router();

router.get('/all_promo_codes', all_promo_codes);

router.get('/claim_promo_code/:id', auth, claim_promo_code);

router.get('/claimed_promo_codes', auth, claimed_promo_codes);

router.get('/apply_promo_code/:code', auth, applyPromoSchema, apply_promo_code);


function applyPromoSchema(req, res, next) {
    const schema = Joi.object({
        amount: Joi.number().required(),
    });
    validateQuery(req, next, schema);
}

module.exports = router;