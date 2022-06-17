'use strict';
const express = require('express');
const {
    register,
    login,
    checkPhone,
    refreshToken,
    reset_password,
    change_password,
    edit_profile,
    profile
} = require('../controllers/authController.js');
const {auth} = require('../middleware/auth.js');
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest.js');


const router = express.Router();

router.post('/signup', registerSchema, register);

router.get('/refresh_token', auth, refreshToken);

router.post('/login', authenticateSchema, login);

router.post('/check_phone/:phone', checkPhone);

router.post('/reset_password', resetAuthenticateSchema, reset_password);

router.post('/change_password', auth, change_password);

router.post('/edit_profile', auth, editAuthenticateSchema, edit_profile);

router.get('/profile', auth, profile);

function registerSchema(req, res, next) {
    const schema = Joi.object({
        phone: Joi.string().required(),
        shop_name: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().min(6).required(),
        division: Joi.string().required(),
        district: Joi.string().required(),
        area: Joi.string().required(),
        address: Joi.string().required(),
        product_type: Joi.string().required(),
        logo: Joi.string().required(),
        banner: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        phone: Joi.string().required(),
        password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function resetAuthenticateSchema(req, res, next) {
    const schema = Joi.object({
        phone: Joi.string().required(),
        new_password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function editAuthenticateSchema(req, res, next) {
    const schema = Joi.object({
        phone: Joi.string(),
        shop_name: Joi.string(),
        name: Joi.string(),
        email: Joi.string().required(),
        whatsapp: Joi.string(),
        password: Joi.string().min(6),
        division: Joi.string(),
        district: Joi.string(),
        area: Joi.string(),
        address: Joi.string(),
        product_type: Joi.string(),
        logo: Joi.string(),
        banner: Joi.string(),
    });
    validateRequest(req, next, schema);
}


module.exports = router;