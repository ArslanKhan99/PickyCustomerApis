const express = require('express');
const validateQuery = require('../middleware/validateRequestQuery.js');

const {
    get_categories_list,
    top_categories,
    get_sub_categories,
    category_colors_sizes
} = require('../controllers/categoryController.js');
const Joi = require("joi");


const router = express.Router();

router.get('/get_categories_list', get_categories_list);

router.get('/top_categories', top_categories);

router.get('/get_sub_categories/:id', get_sub_categories);

router.get('/category_colors_sizes', validateCategoryColors, category_colors_sizes);


function validateCategoryColors(req, res, next) {

    const schema = Joi.object({
        category_id: Joi.string().required(),
    });

    validateQuery(req, next, schema);
}

module.exports = router;