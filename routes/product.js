'use strict';
const express = require('express');
const {
    new_product_category,
    may_like_products,
    all_products,
    search_products,
    recommended_products,
    recommended_products_detail,
    category_sale_products,
    category_feature_products,
    all_feature_products,
    special_products,
    add_recent_visited,
    add_wishlist,
    recent_visited_products,
    category_products,
    subcategory_products,
    remove_wishlist,
    wishlist_items,
    top_sale_products,
    product_details,
    reorder_products
    } = require('../controllers/productController.js');
const {auth} = require('../middleware/auth.js');


const router = express.Router();


router.get('/new_product_category', new_product_category);

router.get('/may_like_products/:category_id', may_like_products);

router.get('/all_products', all_products);

router.get('/all_feature_products', all_feature_products);

router.get('/recent_visited_products', auth, recent_visited_products);

router.get('/special_products', special_products);

router.get('/search_products', search_products);

router.get('/recommended_products', recommended_products);

router.get('/recommended_products_detail', recommended_products_detail);

router.get('/category_sale_products/:id', category_sale_products);

router.get('/category_products/:id', category_products);

router.get('/subcategory_products/:id', subcategory_products);

router.get('/category_feature_products/:id', category_feature_products);

router.get('/add_recent_visited/:id', auth, add_recent_visited);

router.post('/customer/add_wishlist/:id', auth, add_wishlist);

router.post('/customer/wishlist_items', auth, wishlist_items);

router.delete('/customer/remove_wishlist/:id', auth, remove_wishlist);

router.get('/product_details/:id', product_details);

router.get('/reorder_products', auth, reorder_products);



//old

router.get('/top_sale_products', auth, top_sale_products);


module.exports = router;
