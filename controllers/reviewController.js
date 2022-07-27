const db = require('../database/connection_make.js');

exports.my_reviews = async (req,res,next) => {
    let usr = req.user;

    const productReviews = await db.product_reviews.findAll({
            where: {
                user_id: usr.id,
            },
        include: [
            {
                model: db.productModel,
                include: [
                    {
                        required: false,
                        model: db.vendor
                    },
                    {
                        required: false,
                        model: db.product_images,
                        as: 'images'
                    }
                ]
            }
        ]
        }
    );

    res.status(200).json({message: "Vendor order reviews", reviews_list: productReviews});
}


exports.add_product_review = async (req,res,next) => {
    let usr = req.user;
    let data = req.body;

    data.user_id = usr.id;

    let product = await db.productModel.count({where: {id: data.product_id}});

    if(product <= 0){
        next('No such product');
        return;
    }

    let vendor = await db.vendor.count({where: {id: data.seller_id}});

    if(vendor <= 0){
        next('No such vendor');
        return;
    }

    const review = await db.product_reviews.create(data);

    res.status(200).json({message: "Review added successfully"});
}


exports.product_reviews = async (req,res,next) => {
    let usr = req.user;
    let product_id = req.params.product_id;
    let page = req.query.page;
    let pageSize = req.query.pageSize;

    if(!page){
        page = 1;
    }

    if(!pageSize){
        pageSize = 20;
    }

    pageSize = parseInt(`${pageSize}`);
    page = parseInt(`${page}`);

    const reviews = await db.product_reviews.findAll({
        where: {product_id: product_id},
        include: [
            {
                model: db.customer,
                as: 'user'
            }
        ],
        offset: (page-1)*pageSize,
        limit: pageSize,
        order: [
            ['id', 'DESC']
        ]
    });

    for(let i = 0; i < reviews.length; i++) {
        reviews[i].setDataValue('user', [reviews[i].user]);
    }

    res.status(200).json(getFormattedPegging(reviews,page,pageSize));

}


function getFormattedPegging(reviews, page, pageSize){
    return {
        message: "Reviews for product",
        reviews: {
            current_page: page,
            data: reviews,
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
            total: reviews.length
        }
    };
}
