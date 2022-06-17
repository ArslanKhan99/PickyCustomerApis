'use strict';
const express = require('express');
const {
    seller_products,
    seller_sale_products,
    products_by_status,
    top_sale_products,
    product_reviews,
    change_product_status,
    product_details,
    add_product,
    edit_product,
    add_size
    } = require('../controllers/productController.js');
const {auth} = require('../middleware/auth.js');
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest.js');
const {validateRequestQuery} = require('../middleware/validateRequest.js');


const router = express.Router();


router.get('/seller_products', auth, seller_products);

router.get('/seller_sale_products', auth, seller_sale_products);

router.get('/products_by_status/:status', auth, products_by_status);

router.get('/top_sale_products', auth, top_sale_products);

router.get('/product_reviews/:productId', auth, product_reviews);

router.post('/change_product_status', auth, change_product_status);

router.get('/product_details/:id', product_details);

router.post('/add_product', auth,addProductSchema, add_product);

router.post('/edit_product', auth,editProductSchema, edit_product);

router.post('/add_size', auth,addSizeSchema, add_size);


function addProductSchema(req, res, next) {
    const subSchema = Joi.object().keys({
        seller_id: Joi.string().required(),
        product_title: Joi.string().required(),
        category_id: Joi.string().required(),
        sub_category_id: Joi.string().required(),
        description: Joi.string().required(),
        full_description: Joi.string().required(),
        tags: Joi.string(),
        sold_quantity: Joi.string(),
        is_on_sale: Joi.string(),
        sale_id: Joi.string(),
        video_link: Joi.string(),
        sku: Joi.string(),
        unit: Joi.string(),
        unit_value: Joi.string(),
        brand: Joi.string(),
        delivery_apply_on: Joi.string().default("0"),
        free_delivery_on: Joi.string().default("0"),
        duration_type: Joi.string().default("days"),
        minimum_range: Joi.string().default("1"),
        maximum_range: Joi.string().default("1"),
        delivery_price: Joi.string().default("0"),
    });

    const subDeliverySchema = Joi.object().keys({
        box_weight: Joi.string().default("0"),
        box_width: Joi.string().default("0"),
        box_length: Joi.string().default("0"),
        box_height: Joi.string().default("0"),
        dangerous_goods: Joi.string().default("None"),
    });

    const schema = Joi.object({
        product: subSchema,
        ingredients: Joi.array().default([]),
        product_adons: Joi.array().default([]),
        specs: Joi.array().items({
            spec_title: Joi.string().required(),
            spec_description: Joi.string().required(),
        }),
        images: Joi.array().min(1).items(Joi.string().required()).required(),
        veriation: Joi.array().min(1).items({
            color: Joi.string().default("default"),
            color_id: Joi.string().default("0"),
            size: Joi.string().default("default"),
            size_id: Joi.string().default("0"),
            stock: Joi.string().default("0"),
            price: Joi.string().default("1"),
            sale_price: Joi.string().default("1"),
            thumbnail: Joi.number().default(0),
        }).required(),
        delivery_details: subDeliverySchema,
    });

    validateRequest(req, next, schema);
}

function editProductSchema(req, res, next) {
    const subSchema = Joi.object().keys({
        id: Joi.string().required(),
        seller_id: Joi.string().required(),
        product_title: Joi.string().required(),
        category_id: Joi.string().required(),
        sub_category_id: Joi.string().required(),
        description: Joi.string().required(),
        full_description: Joi.string().required(),
        tags: Joi.string(),
        sold_quantity: Joi.string(),
        is_on_sale: Joi.string(),
        sale_id: Joi.string(),
        video_link: Joi.string(),
        sku: Joi.string(),
        unit: Joi.string(),
        unit_value: Joi.string(),
        brand: Joi.string(),
        color: Joi.string(),
        color_id: Joi.string(),
        size: Joi.string(),
        size_id: Joi.string(),
        stock: Joi.string(),
        price: Joi.string(),
        sale_price: Joi.string(),
        delivery_apply_on: Joi.string(),
        free_delivery_on: Joi.string(),
        duration_type: Joi.string(),
        minimum_range: Joi.string(),
        maximum_range: Joi.string(),
        delivery_price: Joi.string(),
    });

    const subDeliverySchema = Joi.object().keys({
        box_weight: Joi.string().default("0"),
        box_width: Joi.string().default("0"),
        box_length: Joi.string().default("0"),
        box_height: Joi.string().default("0"),
        dangerous_goods: Joi.string().default("None"),
    });

    const schema = Joi.object({
        product: subSchema,
        ingredients: Joi.array().default([]),
        product_adons: Joi.array().default([]),
        specs: Joi.array().items({
            spec_title: Joi.string().required(),
            spec_description: Joi.string().required(),
        }),
        images: Joi.array().min(1).items(Joi.string().required()).required(),
        delivery_details: subDeliverySchema,
    });

    validateRequest(req, next, schema);
}

function addSizeSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.string().required(),
        color: Joi.string().default("default"),
        size: Joi.string().default("default"),
        stock: Joi.string().default("0"),
        price: Joi.string().default("1"),
        sale_price: Joi.string().default("1"),
        thumbnail: Joi.number().default(0),
    });

    validateRequest(req, next, schema);
}

module.exports = router;