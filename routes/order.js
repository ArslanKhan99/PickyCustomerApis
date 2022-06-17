const express = require('express');
const {
    order_by_status,
    order_details,
    track_order,
    change_order_status,
    add_ongoing_order_status,
    vendor_order_reviews
} = require('../controllers/orderController.js');
const {auth} = require('../middleware/auth.js');
const Joi = require("joi");
const validateRequestQuery = require("../middleware/validateRequestQuery.js");


const router = express.Router();


router.get('/order_by_status/:status', auth, order_by_status);

router.get('/order_details/:id', auth, order_details);

router.get('/track_order/:id', auth, track_order);

router.post('/change_order_status/', auth, orderStatusSchema, change_order_status);

router.post('/add_ongoing_order_status/', auth, orderOnGoingStatusSchema, add_ongoing_order_status);

router.get('/vendor_order_reviews/', auth, vendor_order_reviews);


function orderStatusSchema(req, res, next) {
      const schema = Joi.object({
            id: Joi.number().required(),
            status: Joi.number().required(),
        });
    validateRequestQuery(req, next, schema);
}

function orderOnGoingStatusSchema(req, res, next) {
      const schema = Joi.object({
          order_id: Joi.number().required(),
          status_title: Joi.string().required(),
          description: Joi.string().required(),
        });
    validateRequestQuery(req, next, schema);
}

module.exports = router;