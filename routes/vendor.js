'use strict';
const express = require('express');
const {
    update_banner,
    set_delivery_areas,
    update_logo,
    add_bank,
    banks_list,
    edit_bank,
    update_fcm_token,
    user_fcm_token,
    payouts} = require('../controllers/vendorController.js');
const {auth} = require('../middleware/auth.js');
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest.js');
const validateRequestQuery = require('../middleware/validateRequestQuery.js');


const router = express.Router();


router.post('/set_delivery_areas', auth, set_delivery_areas);

router.post('/update_banner', auth, update_banner);

router.post('/update_logo', auth, update_logo);

router.post('/add_bank', auth, addBankSchema, add_bank);

router.post('/edit_bank', auth, editBankSchema, edit_bank);

router.get('/banks_list', auth, banks_list);

router.get('/update_fcm_token', auth, tokenUpdateSchema, update_fcm_token);

router.get('/user_fcm_token/:id/:type', auth, user_fcm_token);

router.get('/payouts', auth, payouts);


function addBankSchema(req, res, next) {
    let type = req.query.type;
    if(!type){
        res.status(400).json({massage: "Type is unknown"});
        return;
    }
    let schema;
    if(type == 'bcash') {
        schema = Joi.object({
            title: Joi.string().required(),
            account_no: Joi.string().required(),
            ibn: Joi.string(),
            branch_code: Joi.string(),
            branch_address: Joi.string(),
            bank_name: Joi.string()
        });
    }else{
        schema = Joi.object({
            title: Joi.string().required(),
            account_no: Joi.string().required(),
            ibn: Joi.string().required(),
            branch_code: Joi.string().required(),
            branch_address: Joi.string().required(),
            bank_name: Joi.string().required(),
        });
    }
    validateRequestQuery(req, next, schema);
}

function editBankSchema(req, res, next) {
    let type = req.query.type;
    if(!type){
        res.status(400).json({massage: "Type is unknown"});
        return;
    }
    let schema;
    if(type == 'bcash') {
        schema = Joi.object({
            id: Joi.string().required(),
            title: Joi.string().required(),
            account_no: Joi.string().required(),
            ibn: Joi.string(),
            branch_code: Joi.string(),
            branch_address: Joi.string(),
            bank_name: Joi.string()
        });
    }else{
        schema = Joi.object({
            id: Joi.string().required(),
            title: Joi.string().required(),
            account_no: Joi.string().required(),
            ibn: Joi.string().required(),
            branch_code: Joi.string().required(),
            branch_address: Joi.string().required(),
            bank_name: Joi.string().required(),
        });
    }
    validateRequestQuery(req, next, schema);
}

function tokenUpdateSchema(req, res, next) {
      const schema = Joi.object({
          token: Joi.string().required(),
      });
    validateRequestQuery(req, next, schema);
}


module.exports = router;