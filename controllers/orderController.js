const db = require('../database/connection_make.js');

exports.order_by_status = async (req,res,next) => {
    let usr = req.user;
    let status = req.params.status;

    const orderModel = await db.orderModel.findAll({
            where:
                {
                    seller_id: usr.id,
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
                    model: db.customer
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
    console.log(orderModel);
    for(let i = orderModel.ongoing_order_statuses.length-1 ; i >= 0 ; i--) {
        ongoing_status.push(orderModel.ongoing_order_statuses[i]);
    }
    orderModel.setDataValue('ongoing_status',ongoing_status);
    orderModel.setDataValue('ongoing_order_statuses',undefined);

    res.status(200).json({message: "Order Track", status: orderModel});
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