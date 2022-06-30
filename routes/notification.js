const express = require('express');
const {auth} = require('../middleware/auth.js');
const validateQuery = require('../middleware/validateRequestQuery.js');

const {
    notifications,
    user_fcm_token,
    mark_read_notifications,
    get_unread_notifications_count
} = require('../controllers/notificationController.js');

const Joi = require("joi");


const router = express.Router();

router.get('/notifications', auth, notifications);

router.get('/get_unread_notifications_count', auth, get_unread_notifications_count);

router.get('/user_fcm_token/:id/:type', auth, user_fcm_token);

router.get('/marke_read_notifications/:id/:status', auth, mark_read_notifications);


function sendNotificationSchema(req, res, next) {
    const schema = Joi.object({
        category_id: Joi.string().required(),
    });
    validateQuery(req, next, schema);
}

module.exports = router;