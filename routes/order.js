const express = require('express');
const {
    order_by_status,
    order_details,
    track_order,
    check_delivery_in_area,
    change_payment_method,
    add_order_review,
    change_order_status,
    add_ongoing_order_status,
    checkout
} = require('../controllers/orderController.js');
const {auth} = require('../middleware/auth.js');
const Joi = require("joi");
const validateRequestQuery = require("../middleware/validateRequestQuery.js");
const validateRequest = require("../middleware/validateRequest.js");


const router = express.Router();


router.get('/orders/:status', auth, order_by_status);

router.get('/order_details/:id', auth, order_details);

router.get('/order_track/:id', auth, track_order);

router.get('/check_delivery_in_area/:seller_id/:area', auth, check_delivery_in_area);

router.post('/change_payment_method', auth, orderPaymentSchema, change_payment_method);

router.post('/change_order_status', auth, orderStatusSchema, change_order_status);

router.post('/add_ongoing_order_status', auth, orderOnGoingStatusSchema, add_ongoing_order_status);

router.post('/add_order_review', auth, addReviewSchema, add_order_review);

router.post('/checkout', auth, addOrderSchema, checkout);


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

function orderPaymentSchema(req, res, next) {
      const schema = Joi.object({
          order_id: Joi.number().required(),
          payment_method: Joi.string().required()
        });
    validateRequest(req, next, schema);
}

function addReviewSchema(req, res, next) {
      const schema = Joi.object({
          vendor_id: Joi.number().required(),
          order_id: Joi.number().required(),
          rating: Joi.number().required(),
          comment: Joi.string().required(),
          images: Joi.string(),
        });
    validateRequest(req, next, schema);
}

function addOrderSchema(req, res, next) {
    const schema = Joi.object({
        seller_id: Joi.number().required(),
        sub_total: Joi.number().required(),
        delivery_charges: Joi.number().default(0),
        coupon_id: Joi.number().default(0),
        coupon_price: Joi.number().default(0),
        full_name: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().default("N/A"),
        province: Joi.string().required(),
        city: Joi.string().required(),
        area: Joi.string().required(),
        address: Joi.string().required(),
        note: Joi.string().required(),
        payment_method: Joi.string().required(),
        use_points: Joi.bool().required(),
        products: Joi.array().min(1).items({
            product_id: Joi.number().required(),
            quantity: Joi.number().required(),
            price: Joi.number().required(),
            color: Joi.string().default("default"),
            size: Joi.string().default("default"),
            addons: Joi.string().default("N/A"),
            addon_prices: Joi.string().default("N/A")
        }).required(),
    });

    validateRequest(req, next, schema);
}


module.exports = router;