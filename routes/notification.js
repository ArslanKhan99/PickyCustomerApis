const express = require('express');
const {auth} = require('../middleware/auth.js');
const validateQuery = require('../middleware/validateRequestQuery.js');

const {
    notifications,
    user_fcm_token
} = require('../controllers/notificationController.js');

const Joi = require("joi");


const router = express.Router();

router.get('/notifications', auth, notifications);

router.get('/user_fcm_token', auth, user_fcm_token);


function sendNotificationSchema(req, res, next) {
    const schema = Joi.object({
        category_id: Joi.string().required(),
    });
    validateQuery(req, next, schema);
}

module.exports = router;