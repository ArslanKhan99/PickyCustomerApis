'use strict';
const express = require('express');
const {
    login_phone_password,
    register_phone_password,
    login_with_email,
    login_with_apple_id,
    user_details,
    update_customer,
    refreshToken,
    reset_password,
    login_with_phone,
    change_password,
    earned_points,
    update_fcm_token,
    customer_addresses,
    add_address,
    edit_address,
    delete_address
} = require('../controllers/customerController.js');
const {auth} = require('../middleware/auth.js');
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest.js');
const validateQuery = require('../middleware/validateRequestQuery.js');


const router = express.Router();

router.post('/login_phone_password', authenticateSchema, login_phone_password);

router.post('/register_phone_password', registerSchema, register_phone_password);

router.post('/login_with_email', authEmailSchema, login_with_email);

router.post('/login_with_phone', authPhoneSchema, login_with_phone);

router.post('/login_with_apple_id', authAppleSchema, login_with_apple_id);

router.get('/user_details', auth, user_details);

router.post('/update', auth, updateSchema, update_customer);

router.get('/refresh_token', auth, refreshToken);

router.get('/earned_points', auth, earned_points);

router.get('/update_fcm_to', auth, validateFCMSchema, update_fcm_token);

router.get('/customer_addresses', auth, customer_addresses);

router.post('/reset_password', resetSchema, reset_password);

router.post('/change_password', auth, changePassSchema, change_password);

router.post('/add_address', auth, addAddressSchema, add_address);

router.post('/edit_address', auth, editAddressSchema, edit_address);

router.delete('/delete_address', auth, deleteAddressSchema, delete_address);


function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        phone: Joi.string().required(),
        password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function addAddressSchema(req, res, next) {
    const schema = Joi.object({
        full_name: Joi.string().required(),
        mobile: Joi.string().min(10).required(),
        title: Joi.string().required(),
        province: Joi.string().required(),
        city: Joi.string().required(),
        area: Joi.string().required(),
        address: Joi.string().required(),
        is_default: Joi.bool().required(),
    });
    validateRequest(req, next, schema);
}

function editAddressSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number().required(),
        full_name: Joi.string().required(),
        mobile: Joi.string().min(10).required(),
        title: Joi.string().required(),
        province: Joi.string().required(),
        city: Joi.string().required(),
        area: Joi.string().required(),
        address: Joi.string().required(),
        is_default: Joi.bool().required(),
    });
    validateRequest(req, next, schema);
}

function validateFCMSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
    });
    validateQuery(req, next, schema);
}

function deleteAddressSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.string().required(),
    });
    validateQuery(req, next, schema);
}

function resetSchema(req, res, next) {
    const schema = Joi.object({
        phone: Joi.string().required(),
        password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function changePassSchema(req, res, next) {
    const schema = Joi.object({
        old_password: Joi.string().min(6).required(),
        new_password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        user_name: Joi.string(),
        phone: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        referal_code: Joi.string(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        user_name: Joi.string().required(),
        phone: Joi.string().min(10).required(),
    });
    validateRequest(req, next, schema);
}

function authEmailSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required()
    });

    validateRequest(req, next, schema);
}

function authPhoneSchema(req, res, next) {
    const schema = Joi.object({
        phone: Joi.string().required()
    });

    validateRequest(req, next, schema);
}

function authAppleSchema(req, res, next) {
    const schema = Joi.object({
        apple_id: Joi.string().required()
    });

    validateRequest(req, next, schema);
}

module.exports = router;