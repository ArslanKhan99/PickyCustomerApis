const config = require('./config/dev.json');
const mysql = require('mysql');
const { Sequelize } = require('sequelize');

//models
const userModel = require('../models/userModel.js');
const deliveryModel = require('../models/deliveryAreaModel.js');
const bankModel = require('../models/bankModel.js');
const customerModel = require("../models/customerModel.js");
const payoutModel = require("../models/payoutModel.js");
const productModel = require("../models/productModel.js");
const saleProductModel = require("../models/saleProductModel.js");
const reviewModel = require("../models/productReviewModel.js");
const orderModel = require("../models/orderModel.js");
const orderDetailModel = require("../models/orderDetailModel.js");
const product_images = require("../models/product_images.js");
const product_colors = require("../models/product_colors.js");
const product_addons = require("../models/product_addon.js");
const product_sizes = require("../models/product_sizes.js");
const product_specs = require("../models/product_specs.js");
const ingredients = require("../models/ingredients.js");
const product_delivery_details = require("../models/product_delivery_details.js");
const product_reviews = require("../models/product_reviews.js");
const onGoingOrderStatus = require("../models/on_going_order_status.js");
const order_reviews = require("../models/order_review.js");
const customer_points = require("../models/customer_points.js");
const customer_addresses = require("../models/customer_addresses.js");
const promotional_ads = require("../models/promotional_ads.js");
const categories = require("../models/categories.js");
const sub_categories = require("../models/sub_categories.js");
const colorsModel = require("../models/colors.js");
const sizesModel = require("../models/sizes.js");
const notificationModel = require("../models/notification.js");
const promo_codes = require("../models/promo_codes.js");
const clamed_promo_codes = require("../models/clamed_promo_codes.js");
const feature_products = require("../models/feature_products.js");
const recent_visited_products = require("../models/recent_visited_products.js");
const customer_whishlist = require("../models/customer_whishlist.js");
const salesModel = require("../models/salesModel.js");
const customer_cart = require("../models/customer_cart.js");
const vendorNotificationModel = require("../models/vendor_notifications.js");

//endModels
const db = {};
module.exports = db;

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.vendor = userModel(sequelize);

    db.customer = customerModel(sequelize);

    db.deliveryModel = deliveryModel(sequelize);

    db.bankModel = bankModel(sequelize);

    db.payoutModel = payoutModel(sequelize);
    db.productModel = productModel(sequelize);
    db.saleProductModel = saleProductModel(sequelize);
    db.reviewModel = reviewModel(sequelize);
    db.orderModel = orderModel(sequelize);
    db.orderDetailModel = orderDetailModel(sequelize);
    db.product_images = product_images(sequelize);
    db.product_colors = product_colors(sequelize);
    db.product_adons = product_addons(sequelize);
    db.product_sizes = product_sizes(sequelize);
    db.product_specs = product_specs(sequelize);
    db.ingredients = ingredients(sequelize);
    db.product_delivery_details = product_delivery_details(sequelize);
    db.product_reviews = product_reviews(sequelize);
    db.ongoing_order_status = onGoingOrderStatus(sequelize);
    db.order_reviews = order_reviews(sequelize);
    db.customer_points = customer_points(sequelize);
    db.customer_addresses = customer_addresses(sequelize);
    db.promotional_ads = promotional_ads(sequelize);
    db.categories = categories(sequelize);
    db.sub_categories = sub_categories(sequelize);
    db.colorsModel = colorsModel(sequelize);
    db.sizesModel = sizesModel(sequelize);
    db.notificationModel = notificationModel(sequelize);
    db.promo_codes = promo_codes(sequelize);
    db.clamed_promo_codes = clamed_promo_codes(sequelize);
    db.feature_products = feature_products(sequelize);
    db.recent_visited_products = recent_visited_products(sequelize);
    db.customer_whishlist = customer_whishlist(sequelize);
    db.salesModel = salesModel(sequelize);
    db.customer_cart = customer_cart(sequelize);
    db.vendorNotificationModel = vendorNotificationModel(sequelize);


    //products Relation ships start
    db.productModel.hasMany(db.vendor, {foreignKey: 'id', sourceKey: 'seller_id'});

    db.productModel.hasMany(db.product_images, {foreignKey: 'product_id', sourceKey: 'id', as: 'images'});

    db.productModel.hasMany(db.product_colors, {foreignKey: 'product_id', sourceKey: 'id'});

    db.productModel.hasMany(db.product_adons, {foreignKey: 'product_id', sourceKey: 'id'});

    db.productModel.hasMany(db.product_sizes, {foreignKey: 'product_id', sourceKey: 'id'});

    db.productModel.hasMany(db.product_specs, {foreignKey: 'product_id', sourceKey: 'id'});

    db.productModel.hasMany(db.ingredients, {foreignKey: 'product_id', sourceKey: 'id'});

    db.productModel.hasMany(db.product_delivery_details, {foreignKey: 'product_id', sourceKey: 'id', as: "delivery_details"});

    db.productModel.hasMany(db.product_reviews, {foreignKey: 'product_id', sourceKey: 'id'});

    db.customer.hasMany(db.product_reviews, {foreignKey: 'user_id', sourceKey: 'id'});


    db.vendor.belongsTo(db.productModel, {foreignKey: 'id'});

    db.product_images.belongsTo(db.productModel, {foreignKey: 'product_id'});

    db.product_colors.belongsTo(db.productModel, {foreignKey: 'product_id'});

    db.product_adons.belongsTo(db.productModel, {foreignKey: 'product_id'});

    db.product_sizes.belongsTo(db.productModel, {foreignKey: 'product_id'});

    db.product_specs.belongsTo(db.productModel, {foreignKey: 'product_id'});

    db.ingredients.belongsTo(db.productModel, {foreignKey: 'product_id'});

    db.product_delivery_details.belongsTo(db.productModel, {foreignKey: 'product_id'});

    db.product_reviews.belongsTo(db.productModel, {foreignKey: 'product_id'});

    db.product_reviews.belongsTo(db.customer, {foreignKey: 'user_id',as: 'user'});

    //products Relation ships end

    db.orderModel.hasMany(db.ongoing_order_status, {foreignKey: 'order_id'});

    db.ongoing_order_status.belongsTo(db.orderModel, {foreignKey: 'order_id'});

    //salesModel Relation ships end

    db.salesModel.hasMany(db.saleProductModel, {foreignKey: 'sale_id'});

    db.saleProductModel.belongsTo(db.salesModel, {foreignKey: 'sale_id'});


    db.saleProductModel.hasOne(db.productModel, {foreignKey: 'id'});

    db.productModel.belongsTo(db.saleProductModel, {foreignKey: 'id'});


    db.orderModel.hasMany(db.orderDetailModel, {foreignKey: "order_id"});

    db.orderModel.hasOne(db.customer, {foreignKey: "id"});

    db.customer.belongsTo(db.orderModel, {foreignKey: "id"});

    db.orderModel.hasOne(db.vendor, {foreignKey: "id", sourceKey: "seller_id"});

    db.vendor.belongsTo(db.orderModel, {foreignKey: "id", sourceKey: "seller_id"});

    db.orderDetailModel.belongsTo(db.orderModel, {foreignKey:"order_id"});

    db.orderDetailModel.hasOne(db.productModel, {foreignKey:"id", sourceKey: "product_id"});

    db.orderDetailModel.hasOne(db.product_images, {foreignKey:"product_id", sourceKey: "product_id"});

    db.productModel.belongsTo(db.orderDetailModel, {foreignKey:"id", sourceKey: "product_id" });

    db.product_images.belongsTo(db.orderDetailModel, {foreignKey:"product_id", sourceKey: "product_id"});


    //categories with products start

    db.categories.hasMany(db.productModel, {foreignKey: 'category_id', sourceKey: 'id'});

    db.productModel.belongsTo(db.categories, {foreignKey: 'category_id'});

    //categories with products end


    //categories with sub categories start

    db.categories.hasMany(db.sub_categories, {foreignKey: 'category_id', sourceKey: 'id'});

    db.sub_categories.belongsTo(db.categories, {foreignKey: 'category_id'});

    //categories with products end


    //order vs reviews

    db.orderModel.hasMany(db.order_reviews, {foreignKey: 'order_id'});

    db.order_reviews.belongsTo(db.orderModel, {foreignKey: 'order_id'});

    //cart vs products

    db.customer_cart.hasOne(db.productModel, {foreignKey: 'id', sourceKey: 'product_id'});

    db.productModel.belongsTo(db.customer_cart, {foreignKey: 'id', sourceKey: 'product_id'});

    //end order vs reviews
    // sync all models with database
    await sequelize.sync();
}