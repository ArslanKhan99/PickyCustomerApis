const db = require('../database/connection_make.js');

exports.order_by_status = async (req,res,next) => {
    let usr = req.user;
    let status = req.params.status;

    const orderModel = await db.orderModel.findAll({
            where:
                {
                    user_id: usr.id,
                    status: status
                },
            include: [
                {
                    model: db.orderDetailModel,
                    include: [
                        {
                            model: db.productModel
                        },
                        {
                            model: db.product_images
                        },
                    ]

                },
                {
                    model: db.order_reviews
                }
            ]
        }
    );

    for(let j = 0 ; j < orderModel.length; j++) {
        for (let i = 0; i < orderModel[j].order_details.length; i++) {
            if(orderModel[j].order_details[i].product === null || orderModel[j].order_details[i].product.product_title === null || orderModel[j].order_details[i].product.product_title === undefined) {
                orderModel[j].order_details[i].setDataValue('product_title', "N/A");
            }else{
                orderModel[j].order_details[i].setDataValue('product_title', orderModel[j].order_details[i].product.product_title);
            }
            orderModel[j].order_details[i].setDataValue('image', orderModel[j].order_details[i].product_image);

            orderModel[j].order_details[i].setDataValue('product', undefined);
            orderModel[j].order_details[i].setDataValue('product_image', undefined);

            await orderModel[j].order_details[i].save();
        }
        orderModel[j].setDataValue('products', orderModel[j].order_details);
        orderModel[j].setDataValue('order_details', undefined);
        if(orderModel[j].order_reviews.length > 0) {
            orderModel[j].setDataValue('can_review', false);
        }else{
            orderModel[j].setDataValue('can_review', true);
        }
        orderModel[j].setDataValue('order_reviews', undefined);
        await orderModel[j].save();
    }

    res.status(200).json({message: "Vendor Orders", orders: orderModel});
}

exports.order_details = async (req,res,next) => {
    let usr = req.user;
    let id = req.params.id;

    const orderModel = await db.orderModel.findByPk(id,{
            include: [
                {
                    model: db.orderDetailModel,
                    include: [
                        {
                            model: db.productModel
                        },
                        {
                            model: db.product_images
                        },
                    ]

                },
                {
                    model: db.vendor
                },
                {
                    model: db.order_reviews
                }
            ]
        }
    );

    for (let i = 0; i < orderModel.order_details.length; i++) {
        if(orderModel.order_details[i].product === null || orderModel.order_details[i].product.product_title === null || orderModel.order_details[i].product.product_title === undefined) {
            orderModel.order_details[i].setDataValue('product_title', "N/A");
        }else{
            orderModel.order_details[i].setDataValue('product_title', orderModel.order_details[i].product.product_title);
        }
        orderModel.order_details[i].setDataValue('image', orderModel.order_details[i].product_image);

        orderModel.order_details[i].setDataValue('product', undefined);
        orderModel.order_details[i].setDataValue('product_image', undefined);

        await orderModel.order_details[i].save();
    }
    orderModel.setDataValue('products', orderModel.order_details);
    orderModel.setDataValue('order_details', undefined);
    orderModel.setDataValue('seller', orderModel.vendor);
    orderModel.setDataValue('vendor', undefined);

    if(orderModel.order_reviews.length > 0) {
        orderModel.setDataValue('can_review', false);
    }else{
        orderModel.setDataValue('can_review', true);
    }
    orderModel.setDataValue('order_reviews', undefined);
    await orderModel.save();

    res.status(200).json({message: "Vendor Orders", order: [orderModel]});

}

exports.track_order = async (req,res,next) => {
    let usr = req.user;
    let id = req.params.id;

    const orderModel = await db.orderModel.findByPk(id,{
            attributes: [
              'status',
                'expected_delivery'
            ],
            include: [
                {
                    model: db.ongoing_order_status,
                }
            ],
        }
    );

    orderModel.setDataValue('order_status', orderModel.status);
    orderModel.setDataValue('status', undefined);
    let ongoing_status = [];
    for(let i = orderModel.ongoing_order_statuses.length-1 ; i >= 0 ; i--) {
        ongoing_status.push(orderModel.ongoing_order_statuses[i]);
    }
    orderModel.setDataValue('ongoing_status',ongoing_status);
    orderModel.setDataValue('ongoing_order_statuses',undefined);

    res.status(200).json({message: "Order Track", status: orderModel});
}

exports.check_delivery_in_area = async (req,res,next) => {
    let usr = req.user;
    let seller_id = req.params.seller_id;
    let area = req.params.area;

    let delivery_areas = await db.deliveryModel.findOne({where: {vendor_id: seller_id}});

    let exists = false;
    if(delivery_areas){
        let areas = delivery_areas.areas.split(',');
        for(let i = 0; i < areas.length; i++) {
            if(areas[i] === `${area}`){
                exists = true;
                break;
            }
        }
    }else{
        res.status(400).json({message: "User do not have any delivery area", status: false});
        return;
    }

    res.status(200).json({message: exists ? "User Can deliver in this area":"Seller can not deliver in this area.", status: exists});
}

exports.change_payment_method = async (req,res,next) => {
    let usr = req.user;
    let order_id = req.body.order_id;
    let payment_method = req.body.payment_method.toLowerCase();

    let order = await db.orderModel.findByPk(order_id);

    if(!order) {
        next('No such order exists');
        return;
    }

    if(payment_method === 'cod'){
        Object.assign(order, {payment_method:'cod'});
        Object.assign(order, {status: 1});
        await order.save();
        res.status(200).json({message: "Order payment method changed successfully"});
    }else if(payment_method === 'wallet' || payment_method === 'point'){
        let totalBill = (order.sub_total+order.delivery_charges) - order.coupon_price;
        let result = await deductionPoints(usr.id, totalBill);
        if(result){
            Object.assign(order, {payment_method: payment_method});
            Object.assign(order, {payment_status: "completed"});
            Object.assign(order, {status: 1});
            await order.save();
            res.status(200).json({message: "Order payment method changed successfully"});
        }else{
            res.status(400).json({message: "Insufficient balance"});
        }
    }else{
        res.status(400).json({message: "invalid payment method"});
    }


}

exports.change_order_status = async (req,res,next) => {
    let usr = req.user;
    let id = req.query.id;
    let status = req.query.status;

    const status_order = await db.orderModel.findByPk(id);

    if(!status_order){
        next('no such order exists');
        return;
    }

    Object.assign(status_order, {status: status});

    await status_order.save();

    res.status(200).json({message: "Order Status changed successfully"});
}

exports.vendor_order_reviews = async (req,res,next) => {
    let usr = req.user;

    const orderReviews = await db.order_reviews.findAll({
           where: {
               vendor_id: usr.id,
           }
        }
    );

    res.status(200).json({message: "Vendor order reviews", reviews: orderReviews});
}

exports.add_ongoing_order_status = async (req,res,next) => {
    let usr = req.user;
    let order_id = req.query.order_id;
    let status_title = req.query.status_title;
    let description = req.query.description;

    let data = {
        "order_id": order_id,
        "status_title": status_title,
        "description": description,
        "time_stemp": new Date().getTime(),
    };

    const status_order = await db.ongoing_order_status.create(data);

    if(!status_order){
        next('Can not change the status');
        return;
    }

    res.status(200).json({message: "Order Status changed successfully"});
}

exports.add_order_review = async (req, res, next) => {
    let data = req.body;
    let user = req.user;
    data.user_id = user.id;

    let order = await db.orderModel.findByPk(data.order_id);

    if(!order){
        next('Order not found');
        return;
    }

    await db.order_reviews.create(data);

    res.status(200).json({message: "review successfully created"});
}

exports.checkout = async (req,res,next) => {
    let data = req.body;
    let user = req.user;

    let order = {
        'user_id':user.id,
        'seller_id':data.seller_id,
        'sub_total':data.sub_total,
        'delivery_charges':data.delivery_charges,
        'delivered_by':'0',
        'coupon_id':data.coupon_id,
        'coupon_price':data.coupon_price,
        'full_name':data.full_name,
        'phone':data.phone,
        'email':data.email,
        'province':data.province,
        'city':data.city,
        'area':data.area,
        'address':data.address,
        'note': data.note,
        'payment_method':data.payment_method,
        'transaction_no':'',
        'payment_status':"pending",
        'status': data.payment_method.toLowerCase() === "cod" ? "1" : "0",
        'ordered_at': new Date().getTime(),
    };

    if(data.use_points){
        let total_amount = (order.sub_total + order.delivery_charges) - order.coupon_price;
        order.paid_amount  = await checkDeductionPartialPoints(user.id, total_amount);
    }

    let result_order_create = await db.orderModel.create(order);

    for(let i = 0; i < data.products.length; i++) {
        data.products[i].order_id = result_order_create.id;
        await db.orderDetailModel.create(data.products[i]);
    }

    res.status(200).json({message: "Order created successfully", order_id: result_order_create.id});
}

async function deductionPoints(user_id, amount){
    let user = await db.customer.findByPk(user_id);

    if(user.points >= amount){
        Object.assign(user, {points: user.points - amount});
        await user.save();
        return true;
    }else{
        return false;
    }
}

async function checkDeductionPartialPoints(user_id, amount){
    let user = await db.customer.findByPk(user_id);

    if(user.points >= amount){
        Object.assign(user, {points: user.points - amount});
        await user.save();
        return amount;
    }else if(user.points > 0){
        let points = user.points;
        Object.assign(user, {points: 0});
        await user.save();
        return points;
    }else{
        return 0;
    }
}

exports.add_to_cart = async (req,res,next) => {
    let user = req.user;
    let product_id = req.query.product_id;
    let quantity = req.query.quantity;

    let product = await db.productModel.findByPk(product_id);

    if(!product) {
        next('No such product found');
        return;
    }

    let aPro = await db.customer_cart.findOne({where: {product_id: product.id, user_id: user.id}});

    if(!aPro){
        let data = {
            user_id: user.id,
            product_id: product_id,
            quantity: quantity,
            size: product.size,
            color: product.color,
        };

        let result = db.customer_cart.create(data);

    }else{
        let total_quantity = parseInt(`${aPro.quantity}`) + parseInt(`${+quantity}`);
        Object.assign(aPro, {quantity: total_quantity});
        await aPro.save();
    }

    res.status(200).json({message: "added to cart"});

}


exports.cart_items = async (req,res,next) => {
    let user = req.user;

    let cart_items = await db.customer_cart.findAll(
        {
            where: {
                user_id: user.id
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
            ]
        }
    );

    let products = [];

    for (let i = 0; i < cart_items.length; i++) {
        let pro = cart_items[i].product;
        cart_items[i].setDataValue('product', undefined);
        pro.setDataValue('selected_variation' , [cart_items[i]]);
        await pro.save();
        products.push(pro);
    }

    let pModel = await addRatings(products);

    res.status(200).json({message: "Cart", products: pModel});

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


exports.remove_cart = async (req,res,next) => {
    let user = req.user;
    let product_id = req.params.product_id;

    let product = await db.productModel.findByPk(product_id);

    if(!product) {
        next('No such product found');
        return;
    }

    let result = db.customer_cart.destroy({where: {product_id: product.id, user_id: user.id}});

    res.status(200).json({message: "removed from cart"});
}

exports.empty_cart = async (req,res,next) => {
    let user = req.user;

    let result = db.customer_cart.destroy({where: {user_id: user.id}});

    res.status(200).json({message: "removed from cart"});
}