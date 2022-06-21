const express = require('express');
const {
    get_ads_list
} = require('../controllers/bannerController.js');


const router = express.Router();

router.get('/get_ads_list', get_ads_list);

module.exports = router;