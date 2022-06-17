'use strict';

const db = require('../database/connection_make.js');
const Sequelize = require("sequelize");
const {array} = require("joi");
const {where} = require("sequelize");

exports.seller_products = async(req,res,next) => {
    const usr = req.user;
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
        where: {seller_id: usr.id, parent_id: 0},
        offset: (page-1)*pageSize,
        limit: pageSize,
        group: ['id'],
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

exports.products_by_status = async(req,res,next) => {
    const usr = req.user;
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let status = parseInt(`${req.params.status}`);
    if(!page){
        page = 1;
    }

    if(!pageSize){
        pageSize = 10;
    }

    pageSize = parseInt(`${pageSize}`);
    page = parseInt(`${page}`);

    const products = await db.productModel.findAll({
        where: {seller_id: usr.id, parent_id: 0, status: status},
        offset: (page-1)*pageSize,
        limit: pageSize,
        group: ['id'],
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

exports.top_sale_products   = async(req,res,next) => {
    const usr = req.user;

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
        where: {seller_id: usr.id, parent_id: 0},
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
            ['sold_quantity', 'DESC'],
            ['id', 'ASC']
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
    const usr = req.user;
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
            seller_id: usr.id,
            parent_id: 0,
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

    let json_data = getFormattedPegging(products,page,pageSize);
    let temp = json_data['products'];
    json_data.products = undefined;
    json_data.sale_products = temp;

    res.status(200).json(json_data);

}

exports.product_reviews = async(req,res,next) => {
    const usr = req.user;
    let productId = req.params.productId;

    const rev = await db.reviewModel.findAll({
        where: {seller_id: usr.id, product_id: productId},
        order: [
            ['id', 'DESC']
        ],
        raw: true
    });

    let reviews = rev;

    for(let r in reviews){
        let user = await db.customer.findByPk(reviews[r].user_id, {raw: true});
       reviews[r].user = user;
    }

    res.status(200).json({
        message: "Reviews",
        reviews: reviews
    });

}

exports.change_product_status = async(req, res, next) => {
    let usr = req.user;
    let {status, id} = req.query;

    if(!(status && id)){
        next('Missing parameters status or id');
        return;
    }

    const product = await db.productModel.findByPk(id);

    if(!product){
        next('No such product exist');
        return;
    }else if(parseInt(`${status}`) < -1 || parseInt(`${status}`) > 4){
        next('invalid status value');
        return;
    }else if(product.seller_id !== parseInt(`${usr.id}`)){
        next('You don\'t have rights to change the status of this product.');
        return;
    }

    Object.assign(product, {status: status});
    await product.save();

    res.status(200).json({
        message: "status changed successfully"
    });
}

exports.product_details = async(req, res, next) => {
    let id = req.params.id;

    if(!(id)){
        next('Missing parameters status or id');
        return;
    }

    const products = await db.productModel.findAll({
        where: Sequelize.or(
                {
                    id: id
                },
                {
                    parent_id: id
                }
            ),
        group: ['id'],
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


    res.status(200).json(getFormattedPegging(products,1,100));
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

exports.add_product = async(req,res,next) => {
    let product = req.body;

    let products = [];

    product.veriation.forEach((v,i)=>{
       const pro = {
            ...product.product,
            "color" : v.color,
            "color_id" : v.color_id,
            "size" : v.size,
            "size_id" : v.size_id,
            "stock" : v.stock,
            "price" : v.price,
            "sale_price" : v.sale_price,
           "thumbnail" : v.thumbnail
        };

       products.push(pro);
    });
    let parent_id = 0;
    for(let i = 0; i < products.length; i++) {
        products[i].parent_id = parent_id;
        let result = await db.productModel.create(products[i]);

        let renderImages = product.images;

        if(renderImages.length > products[i].thumbnail) {
            let tempImg = renderImages[0];
            renderImages[0] = renderImages[products[i].thumbnail];
            renderImages[products[i].thumbnail] = tempImg;
        }

        let images = [];

        renderImages.forEach((image) => {
            const imag = {
                image: image,
                product_id: result.id,
            }
            images.push(imag);
        });

        for(let j = 0; j < images.length; j++) {
            await db.product_images.create(images[j]);
        }

        for(let j = 0; j < product.product_adons.length; j++) {
            product.product_adons[j].product_id = result.id;
            await db.product_adons.create(product.product_adons[j]);
        }

        for(let j = 0; j < product.ingredients.length; j++) {
            product.ingredients[j].product_id = result.id;
            await db.ingredients.create(product.ingredients[j]);
        }

        for(let j = 0; j < product.specs.length; j++) {
            product.specs[j].product_id = result.id;
            await db.product_specs.create(product.specs[j]);
        }

        let delivery_details = product.delivery_details;

        delivery_details.product_id = result.id;

        await db.product_delivery_details.create(delivery_details);

        if(renderImages.length > products[i].thumbnail) {
            let tempImg = renderImages[products[i].thumbnail];
            renderImages[products[i].thumbnail] = renderImages[0];
            renderImages[0] = tempImg;
        }

        if(parent_id === 0){
            parent_id = result.id;
        }
    }

    res.json({
        message: "Product added successfully"
    });
}

exports.edit_product = async(req,res,next) => {
    let product = req.body;

    let result = await db.productModel.findByPk(product.product.id);

    if(!result){
        next('No such product exists');
        return;
    }

    result.update(product.product);

    db.product_images.destroy({where: {product_id: product.product.id}});
    db.product_adons.destroy({where: {product_id: product.product.id}});
    db.ingredients.destroy({where: {product_id: product.product.id}});
    db.product_specs.destroy({where: {product_id: product.product.id}});
    db.product_delivery_details.destroy({where: {product_id: product.product.id}});

    let images = [];
    product.images.forEach((image) => {
        const imag = {
            image: image,
            product_id: product.product.id,
        }
        images.push(imag);
    });

    for(let j = 0; j < images.length; j++) {
        await db.product_images.create(images[j]);
    }

    for(let j = 0; j < product.product_adons.length; j++) {
        product.product_adons[j].product_id = result.id;
        await db.product_adons.create(product.product_adons[j]);
    }

    for(let j = 0; j < product.ingredients.length; j++) {
        product.ingredients[j].product_id = result.id;
        await db.ingredients.create(product.ingredients[j]);
    }

    for(let j = 0; j < product.specs.length; j++) {
        product.specs[j].product_id = result.id;
        await db.product_specs.create(product.specs[j]);
    }

    let delivery_details = product.delivery_details;

    delivery_details.product_id = product.product.id;

    await db.product_delivery_details.create(delivery_details);

    res.json({
        message: "Product updated successfully"
    });
}

exports.add_size = async(req,res,next) => {
    let variation = req.body;

    let fPro = await db.productModel.findByPk(variation.id);

    if(!fPro){
        next('No such product exists');
        return;
    }

    let aPro = fPro.toJSON();

    aPro['id'] = undefined;
    aPro['parent_id'] =  variation.id;
    aPro['color'] = variation.color;
    aPro['size'] = variation.size;
    aPro['stock'] = variation.stock;
    aPro['price'] = variation.price;
    aPro['sale_price'] = variation.sale_price;

    let result = await db.productModel.create(aPro);

    let images = [];

    let apImages = await db.product_images.findAll({where: {product_id: variation.id}});
    let aadons = await db.product_adons.findAll({where: {product_id: variation.id}});
    let aingredients = await db.ingredients.findAll({where: {product_id: variation.id}});
    let aspecs = await db.product_specs.findAll({where: {product_id: variation.id}});
    let ad_details = await db.product_delivery_details.findOne({where: {product_id: variation.id}});

    let pImages = JSON.parse(JSON.stringify(apImages));
    let adons = JSON.parse(JSON.stringify(aadons));
    let ingredients = JSON.parse(JSON.stringify(aingredients));
    let specs = JSON.parse(JSON.stringify(aspecs));
    let d_details = ad_details.toJSON();

    pImages.forEach((image) => {
        const imag = {
            image: image.image,
            product_id: result.id,
        }
        images.push(imag);
    });

    let temp = images[0];
    images[0] = images[variation.thumbnail];
    images[variation.thumbnail] = temp;


    for(let j = 0; j < images.length; j++) {
        await db.product_images.create(images[j]);
    }

    for(let j = 0; j < adons.length; j++) {
        adons[j].id = undefined;
        adons[j].product_id = result.id;
        await db.product_adons.create(adons[j]);
    }

    for(let j = 0; j < ingredients.length; j++) {
        ingredients[j].id = undefined;
        ingredients[j].product_id = result.id;
        await db.ingredients.create(ingredients[j]);
    }

    for(let j = 0; j < specs.length; j++) {
        specs[j].id = undefined;
        specs[j].product_id = result.id;
        await db.product_specs.create(specs[j]);
    }

    d_details.id = undefined;
    d_details.product_id = result.id;

    await db.product_delivery_details.create(d_details);

    res.json({
        message: "Size added successfully"
    });
}