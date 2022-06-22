const express = require('express');
const {
    my_reviews,
    product_reviews,
    add_product_review
} = require('../controllers/reviewController.js');
const {auth} = require('../middleware/auth.js');
const Joi = require("joi");
const validateRequestQuery = require("../middleware/validateRequestQuery.js");
const validateRequest = require('../middleware/validateRequest.js');



const router = express.Router();

router.get('/my_reviews', auth, my_reviews);

router.get('/product_reviews/:product_id', auth, product_reviews);

router.post('/add_product_review', auth, addReviewSchema, add_product_review);


function addReviewSchema(req, res, next) {
    const schema = Joi.object({
        seller_id: Joi.number().required(),
        product_id: Joi.number().required(),
        date_time: Joi.string().required(),
        rating: Joi.number().required(),
        review: Joi.string().required(),
        images: Joi.string()
    });
    validateRequest(req, next, schema);
}

module.exports = router;