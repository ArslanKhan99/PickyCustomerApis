const db = require('../database/connection_make.js');
const braintree = require("braintree");

exports.getToken = async(req, res, next)=>{
    let user = req.user;

    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: "wmq3fhh6jk289kfn",
        publicKey: "cd4dwp32hzz5v2rg",
        privateKey: "b1340e3852aa7067b0a3cee71dba964f",
    });

    gateway.clientToken.generate({}, (err, response) => {
        if(err) {
            next(err);
            return;
        }

        if(response.success) {
            res.status(200).json({message: "TOKEN generated", token: response.clientToken});
        }else{
            next("invalid response can not get the token");
        }
    });
};

exports.braintree_payment = async(req, res, next)=>{
    let user = req.user;
    let amount = req.query.amount;
    let order_id = req.query.order_id;
    let nonce = req.query.nonce;

    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: "wmq3fhh6jk289kfn",
        publicKey: "cd4dwp32hzz5v2rg",
        privateKey: "b1340e3852aa7067b0a3cee71dba964f",
    });

    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce,
        options: {
            submitForSettlement: true
        }
    }, async(err, result) => {
        if(err){
            next(err);
            return;
        }

        if(result.success !== undefined && result.success !== null && result.success !== false){
            let transaction_id = result.transaction.id;
            let order = await db.orderModel.findByPk(order_id);
            if(!order){
                next('no order found with your transaction');
            }else{
                Object.assign(order, {transaction_no: transaction_id, status: 1, payment_status: "completed"});
                await order.save();
                res.status(200).json({message: "success", status: true});
            }
        }else{
            next('Can not find transaction please try again');
        }
    });
};