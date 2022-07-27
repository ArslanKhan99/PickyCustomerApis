'use strict';

const db = require("../database/connection_make.js");
const Sequelize = require("sequelize");

exports.uploadImage = (req,res, next) => {
    if(!req.file){
        next('upload file to save');
        return;
    }

    res.status(200).json({
        message: "image uploaded successfully",
        image: req.file.filename
    })

}

exports.seller_details = async(req,res, next) => {
    let id = req.query.id;

    const vendor = await db.vendor.scope('withHash').findByPk(id);

    const products = await db.productModel.findAll(
        {
            where: {
                seller_id: id, status: 3
            },
            limit: 20,
            include: [
                {
                    model: db.product_reviews,
                    required: false,
                },
                {
                    required: false,
                    model: db.vendor
                },
                {
                    required: false,
                    model: db.product_images,
                    as: 'images'
                },
                {
                    required: false,
                    model: db.product_colors
                },
                {
                    required: false,
                    model: db.product_sizes
                },
                {
                    required: false,
                    model: db.product_specs
                },
                {
                    required: false,
                    model: db.product_adons
                },
                {
                    required: false,
                    model: db.ingredients
                },
                {
                    required: false,
                    model: db.product_delivery_details,
                    as: "delivery_details"
                },
            ],
        },
    );

    let pModel = await addRatings(products);

    const reviews = await db.product_reviews.findAll({where: {seller_id: vendor.id}});
    const order_completed = await db.orderModel.count({where: {seller_id: vendor.id, status: 3}});

    let rating = 0;
    let ratingTotal = 0;
    let review_count = 0;

    reviews.forEach((review) => {
       review_count++;
       ratingTotal += review.rating;
    });

    if(review_count > 0){
        rating = (ratingTotal / review_count);
    }

    vendor.setDataValue('rating', parseFloat(rating.toFixed(2))+1/100);
    vendor.setDataValue('review_count', review_count);
    vendor.setDataValue('order_completed', order_completed);


    if(!vendor){
        next("no such vendor");
        return;
    }

    res.status(200).json({message: "Vendor information", products: pModel, seller: vendor});

}

exports.getRestaurants = async(req,res, next) => {
    const restaurants = await db.vendor.scope('withHash').findAll(
        {
            where:{
                product_type: {[Sequelize.Op.like] : '%food%'},
                status: 'approved'
            },
            include: [
                {
                    model: db.order_reviews
                }
            ]
        }
    );

    for(let i = 0; i < restaurants.length; i++){
        let rating = 0;
        let ratingTotal = 0;
        let review_count = 0;

        restaurants[i].order_reviews.forEach((review) => {
           review_count++;
           ratingTotal += review.rating;
        });

        if(review_count > 0){
            rating = (ratingTotal / review_count);
        }

        restaurants[i].setDataValue('rating', parseFloat(rating.toFixed(2))+1/100);
        restaurants[i].setDataValue('review_count', review_count);
        restaurants[i].setDataValue('order_reviews', undefined);
    }

    res.status(200).json({message: "Vendor information", restaurants: restaurants});

}

async function addRatings(products){
    let spliceIds = [];
    for(let i = 0; i < products.length; i++){
        if(products[i].parent_id === 0 && `${products[i].status}` === '3') {
            let total_rating = 0;
            let review_count = 0;
            for (let j = 0; j < products[i].product_reviews.length; j++) {
                total_rating += products[i].product_reviews[j].rating;
                review_count++;
                delete products[i].product_reviews[j];
            }
            let rating = review_count > 0 ? total_rating / review_count : 0;
            products[i].setDataValue("rating", parseFloat(rating.toPrecision(2)));
            products[i].setDataValue("review_count", review_count);
            products[i].setDataValue("product_reviews", undefined);
            await products[i].save();
        }else{
            spliceIds.push(i);
        }
    }
    for(let i = spliceIds.length -1; i >= 0; i--){
        products.splice(spliceIds[i],1);
    }
    return products;
}

exports.seller_products = async(req,res,next) => {
    const id = req.query.id;
    let page = req.query.page;
    let pageSize = req.query.pageSize;

    if(!page){
        page = 1;
    }

    if(!pageSize){
        pageSize = 10;
    }

    pageSize = parseInt(`${pageSize}`);
    page = parseInt(`${page}`);

    const products = await db.productModel.findAll({
        where: {seller_id: id, parent_id: 0, status: 3},
        offset: (page-1)*pageSize,
        limit: pageSize,
        include: [
            {
                model: db.product_reviews,
                required: false,
            },
            {
                required: false,
                model: db.vendor
            },
            {
                required: false,
                model: db.product_images,
                as: 'images'
            },
            {
                required: false,
                model: db.product_colors
            },
            {
                required: false,
                model: db.product_sizes
            },
            {
                required: false,
                model: db.product_specs
            },
            {
                required: false,
                model: db.product_adons
            },
            {
                required: false,
                model: db.ingredients
            },
            {
                required: false,
                model: db.product_delivery_details,
                as: "delivery_details"
            },
        ],
        raw: false,
        order: [
            ['id', 'DESC']
        ]
    });

    for(let i = 0; i < products.length; i++){
        let total_rating = 0;
        let review_count = 0;
        for(let j = 0; j < products[i].product_reviews.length; j++){
            total_rating += products[i].product_reviews[j].rating;
            review_count++;
            delete products[i].product_reviews[j];
        }
        let rating = review_count > 0 ? total_rating/review_count : 0;
        products[i].setDataValue("rating" , parseFloat(rating.toPrecision(2)));
        products[i].setDataValue("review_count" , review_count);
        products[i].setDataValue("product_reviews" , undefined);
        await products[i].save();
    }


    res.status(200).json(getFormattedPegging(products,page,pageSize));

}


exports.seller_sale_products = async(req,res,next) => {
    const id = req.query.id;
    let page = req.query.page;
    let pageSize = req.query.pageSize;

    if(!page){
        page = 1;
    }

    if(!pageSize){
        pageSize = 10;
    }

    pageSize = parseInt(`${pageSize}`);
    page = parseInt(`${page}`);

    const saleProducts = await db.saleProductModel.findAll({attributes: ['product_id']});

    const productsIds = [];

    saleProducts.forEach((v)=>{
        productsIds.push(v.product_id);
    });


    console.log(productsIds);

    const products = await db.productModel.findAll({
        where: {
            id: {
                [Sequelize.Op.in]: productsIds
            },
            seller_id: id,
            parent_id: 0,
            status: 3
        },
        include: [
            {
                model: db.product_reviews,
                required: false,
            },
            {
                required: false,
                model: db.vendor
            },
            {
                required: false,
                model: db.product_images,
                as: 'images'
            },
            {
                required: false,
                model: db.product_colors
            },
            {
                required: false,
                model: db.product_sizes
            },
            {
                required: false,
                model: db.product_specs
            },
            {
                required: false,
                model: db.product_adons
            },
            {
                required: false,
                model: db.ingredients
            },
            {
                required: false,
                model: db.product_delivery_details,
                as: "delivery_details"
            },
        ],
        raw: false,
        order: [
            ['id', 'DESC']
        ]
    });

    for(let i = 0; i < products.length; i++){
        let total_rating = 0;
        let review_count = 0;
        for(let j = 0; j < products[i].product_reviews.length; j++){
            total_rating += products[i].product_reviews[j].rating;
            review_count++;
            delete products[i].product_reviews[j];
        }
        let rating = review_count > 0 ? total_rating/review_count : 0;
        products[i].setDataValue("rating" , parseFloat(rating.toPrecision(2)));
        products[i].setDataValue("review_count" , review_count);
        products[i].setDataValue("product_reviews" , undefined);
        await products[i].save();
    }

    res.status(200).json({message: "On sale products", sale_products: products});

}


function getFormattedPegging(products, page, pageSize){
    return {
        message: "Seller All products",
        products: {
            current_page: page,
            data: products,
            first_page_url: "/?page=1",
            from: ((page-1)*pageSize)+1,
            last_page: page,
            last_page_url: "/?page=1",
            links:[

            ],
            next_page_url: `/?page=${page+1}`,
            path: '/',
            per_page: pageSize,
            previous_page_url: `/?page=${page-1}`,
            to: page*pageSize,
            total: products.length
        }
    };
}


