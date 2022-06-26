
const db = require('../database/connection_make.js');
const Sequelize = require("sequelize");

exports.getSales = async(req,res,next) => {

    const sales = await db.salesModel.findAll(
        {
            include: [
                {
                    model: db.saleProductModel,
                    limit: 10,
                    include: [
                        {
                            model: db.productModel,
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
                    ]
                }
            ]
        }
    );

    let salesModels = [];

    sales.forEach(s => {
        let from = new Date(parseInt(s.from_date));
        let to = new Date(parseInt(s.to_date));
        let today = new Date();

        if(today >= from && today <= to){
            if(s.sale_products.length > 0) {
                salesModels.push(s);
            }
        }
    });

        if(salesModels.length > 0){
            for(let j = 0; j < salesModels.length; j++) {
                let product_list = [];
                for(let i = 0; i < salesModels[j].sale_products.length; i++){
                    product_list.push(salesModels[j].sale_products[i].product);
                }

                let pModel = await addRatings(product_list);

                salesModels[j].setDataValue('sale_products', undefined);
                salesModels[j].setDataValue('productList', pModel);
            }
        }

        res.status(200).json({message: "All sales", sales: salesModels});

}

exports.getAllSalesProducts = async(req,res,next) => {
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

    const sales = await db.saleProductModel.findAll(
        {
            where: {
                sale_id: id
            },
            include: [
                {
                    model: db.productModel,
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
            offset: (page-1)*pageSize,
            limit: pageSize,
        }
    );

    let product_list = [];

    if(sales.length > 0){
       for(let i = 0; i < sales.length; i++){
           product_list.push(sales[i].product);
       }
    }

    let pModel = await addRatings(product_list);

    res.status(200).json(getFormattedPegging(pModel,page,pageSize));

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
