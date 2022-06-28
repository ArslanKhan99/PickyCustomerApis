const db = require('../database/connection_make.js');
const Sequelize = require("sequelize");

exports.new_product_category = async(req,res,next) => {

    const cat_products = await db.categories.findAll({
        include: [
            {
                model: db.productModel,
                limit: 10,
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
            }
        ],
        limit: 5,
        order: [
            ['id', 'ASC']
        ]
    });

    for(let k = 0; k < cat_products.length; k++) {
        if (cat_products[k].products.length > 0) {
            cat_products[k].products = await addRatings(cat_products[k].products);
        }else{
            cat_products.splice(k,1);
        }
    }

    res.status(200).json({message: "new products by category", categories_products: cat_products});

}

exports.may_like_products = async(req,res,next) => {
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let category_id = req.params.category_id;

    if(!page){
        page = 1;
    }

    if(!pageSize){
        pageSize = 10;
    }

    pageSize = parseInt(`${pageSize}`);
    page = parseInt(`${page}`);

    const products = await db.productModel.findAll({
        where: {
            parent_id: 0,
            category_id: category_id,
        },
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

    let pModel = await addRatings(products);

    res.status(200).json(getFormattedPegging(products,page,pageSize));

}

exports.all_products = async(req,res,next) => {
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
        where: {
            parent_id: 0,
        },
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

    let pModel = await addRatings(products);

    res.status(200).json(getFormattedPegging(pModel,page,pageSize));

}

exports.recommended_products = async(req,res,next) => {
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
        where: {
            parent_id: 0,
        },
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
        order: Sequelize.literal('rand()')
    });

    let pModel = await addRatings(products);

    res.status(200).json(getFormattedPegging(pModel,page,pageSize));

}

exports.special_products = async(req,res,next) => {
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
        where: {
            parent_id: 0,
        },
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
        order: Sequelize.literal('rand()')
    });

    let pModel = await addRatings(products);

    res.status(200).json(getFormattedPegging(pModel,page,pageSize));

}

exports.add_recent_visited = async (req,res, next) => {
    let user = req.user;
    let id = req.params.id;

    let exist_pro = await db.productModel.findByPk(id);

    if(!exist_pro){
        next('No such product exists');
        return;
    }

    let products = await db.recent_visited_products.findOne({where: {product_id: id, user_id: user.id}});

    if(!products){
        let data = {
            product_id: id,
            user_id: user.id
        };
        const result = await db.recent_visited_products.create(data);
    }

    res.status(200).json({message:"Product added successfully"});


}

exports.add_wishlist = async (req,res, next) => {
    let user = req.user;
    let id = req.params.id;

    let exist_pro = await db.productModel.findByPk(id);

    if(!exist_pro){
        next('No such product exists');
        return;
    }

    let products = await db.customer_whishlist.findOne({where: {product_id: id, user_id: user.id}});

    if(!products){
        let data = {
            product_id: id,
            user_id: user.id
        };
        const result = await db.customer_whishlist.create(data);
    }

    res.status(200).json({message:"Product added to wish list successfully"});


}

exports.remove_wishlist = async (req,res, next) => {
    let user = req.user;
    let id = req.params.id;

    let exist_pro = await db.productModel.findByPk(id);

    if(!exist_pro){
        next('No such product exists');
        return;
    }

    let products = await db.customer_whishlist.destroy({where: {product_id: id, user_id: user.id}});

    res.status(200).json({message:"Product removed from wish list successfully"});
}

exports.search_products = async(req,res,next) => {
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let search = req.query.search;

    if(!search) {
        search = ' ';
    }

    if(!page){
        page = 1;
    }

    if(!pageSize){
        pageSize = 10;
    }

    pageSize = parseInt(`${pageSize}`);
    page = parseInt(`${page}`);

    const products = await db.productModel.findAll({
        where: {
            parent_id: 0,
            [Sequelize.Op.or]: [
                {
                    product_title: {
                        [Sequelize.Op.like]: `%${search}%`
                    },
                },
                {
                    description: {
                        [Sequelize.Op.like]: `%${search}%`
                    },
                },
                {
                    full_description: {
                        [Sequelize.Op.like]: `%${search}%`
                    },
                },
                {
                    tags: {
                        [Sequelize.Op.like]: `%${search}%`
                    },
                },
                {
                    sku: {
                        [Sequelize.Op.like]: `%${search}%`
                    },
                },
            ]
        },
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

    let pModel = await addRatings(products);

    res.status(200).json(getFormattedPegging(pModel,page,pageSize));

}

exports.category_sale_products = async(req,res,next) => {
    let id = req.params.id;
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
            category_id: id,
            parent_id: 0,
        },
        offset: (page-1)*pageSize,
        limit: 10,
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

exports.category_products = async(req,res,next) => {
    let id = req.params.id;
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
        where: {
            category_id: id,
            parent_id: 0,
        },
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

exports.subcategory_products = async(req,res,next) => {
    let id = req.params.id;
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
        where: {
            sub_category_id: id,
            parent_id: 0,
        },
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

exports.category_feature_products = async(req,res,next) => {
    let id = req.params.id;
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

    const saleProducts = await db.feature_products.findAll({attributes: ['product_id']});

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
            category_id: id,
            parent_id: 0,
        },
        offset: (page-1)*pageSize,
        limit: 10,
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

exports.all_feature_products = async(req,res,next) => {
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

    const saleProducts = await db.feature_products.findAll({attributes: ['product_id']});

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
            parent_id: 0,
        },
        offset: (page-1)*pageSize,
        limit: 10,
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

exports.recent_visited_products = async(req,res,next) => {
    let user = req.user;
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

    const saleProducts = await db.recent_visited_products.findAll({attributes: ['product_id'], where:{user_id: user.id}});

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
            parent_id: 0,
        },
        offset: (page-1)*pageSize,
        limit: 10,
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

exports.wishlist_items = async(req,res,next) => {
    let user = req.user;
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

    const saleProducts = await db.customer_whishlist.findAll({attributes: ['product_id'], where:{user_id: user.id}});

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
            parent_id: 0,
        },
        offset: (page-1)*pageSize,
        limit: 10,
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

    res.status(200).json({message: "Wish list products", products: products});

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

    let pModel = await addRatings(products);


    res.status(200).json(getFormattedPegging(pModel,1,100));
}

exports.reorder_products = async(req, res, next) => {
    let user = req.user;

    let orders = await db.orderModel.findAll({where: {user_id: user.id}});

    let order_ids = [];

    orders.forEach(order => {
       order_ids.push(order.id);
    });

    let order_details = await db.orderDetailModel.findAll({
        where: {
            order_id: order_ids,
        }
    });

    let product_ids = [];

    order_details.forEach(o_details => {
       product_ids.push(o_details.product_id);
    });

    const products = await db.productModel.findAll({
        where: {
            id: product_ids
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

    for(let i = 0; i < products.length; i++) {
        if(products[i].parent_id !== 0){
            products[i] = await db.productModel.findByPk(products[i].parent_id);
            await products[i].save();
        }
    }

    let pModel = await addRatings(products);


    res.status(200).json({message: "Purchased products", products: pModel});
}

//Supporting functions

async function addRatings(products){
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
    return products;
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