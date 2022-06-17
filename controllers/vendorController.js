'use strict';

const db = require("../database/connection_make.js");

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

exports.update_banner = async(req,res, next) => {
    let usr = req.user;
    let {banner} = req.body;
    if(!banner){
        next('banner field is required');
        return;
    }

    const user = await db.vendor.findByPk(usr.id);

    Object.assign(user, {banner: banner});

    await user.save();

    res.status(200).json({message: "banner Updated Successfully"});

}

exports.update_logo = async(req,res, next) => {
    let usr = req.user;
    let {logo} = req.body;
    if(!logo){
        next('banner field is required');
        return;
    }

    const user = await db.vendor.findByPk(usr.id);

    Object.assign(user, {logo: logo});

    await user.save();

    res.status(200).json({message: "logo updated Successfully"});

}

exports.add_bank = async(req,res, next) => {
    let usr = req.user;
    let {type, title, account_no, ibn, branch_code, branch_address, bank_name} = req.query;
    let bankDetail = {};
    bankDetail["type"] = type;
    bankDetail["title"] = title;
    bankDetail["account_no"] = account_no;
    bankDetail["ibn"] = ibn;
    bankDetail["branch_code"] = branch_code;
    bankDetail["branch_address"] = branch_address;
    bankDetail["bank_name"] = bank_name;

    bankDetail["vendor_id"] = usr.id;

    db.bankModel.create(bankDetail);

    res.status(200).json({message: "bank added Successfully"});

}

exports.edit_bank = async(req,res, next) => {
    let usr = req.user;
    let {id, type, title, account_no, ibn, branch_code, branch_address, bank_name} = req.query;
    let bankDetail = {};
    bankDetail["type"] = type;
    bankDetail["title"] = title;
    bankDetail["account_no"] = account_no;
    bankDetail["ibn"] = ibn;
    bankDetail["branch_code"] = branch_code;
    bankDetail["branch_address"] = branch_address;
    bankDetail["bank_name"] = bank_name;
    bankDetail["vendor_id"] = usr.id;

    const bankModel = await db.bankModel.findByPk(id);

    if(!bankModel)
        next('No such bank exists');

    Object.assign(bankModel, bankDetail);

    await bankModel.save();

    res.status(200).json({message: "bank updated Successfully"});

}

exports.update_fcm_token = async(req,res, next) => {
    let usr = req.user;

    const user = await db.vendor.findByPk(usr.id);

    if(!user) {
        next('No such user exists');
        return;
    }

    Object.assign(user, {token: req.query.token});

    await user.save();

    res.status(200).json({message: "token updated Successfully"});

}

exports.payouts = async(req,res, next) => {
    let usr = req.user;

    const payouts = await db.payoutModel.findAll({where: {seller_id: usr.id}});

    res.status(200).json({message: "Vendor Payouts", payouts: payouts});

}

exports.user_fcm_token = async(req,res, next) => {
    let usr = req.user;
    let type = req.params.type;
    let id = req.params.id;
    let user;
    if(`${type}` === 'vendor') {
        user = await db.vendor.findByPk(id);
    }else if(`${type}` === 'customer'){
        user = await db.customer.findByPk(id);
    }else{
        next('Invalid value type can be only vendor or customer');
        return;
    }
    if(!user) {
        next('No such user exists');
        return;
    }

    res.status(200).json({message: `FCM token ${type}`, token: user.token});

}

exports.banks_list = async(req,res, next) => {
    let usr = req.user;

    const bankList = await db.bankModel.findAll({
        where: {vendor_id: usr.id},
        order: [
            ['id', 'DESC']
        ]
    });

    if(!bankList) {
        res.status(200).json({
            message: "vendor bank list",
            banks: []
        });
        return;
    }

    res.status(200).json({
        message: "vendor bank list",
        banks: bankList
    });
}

exports.set_delivery_areas =  async(req,res,next)=> {
    let user = req.user;

    let {areas} = req.body;

    if (!areas) {
        areas = "";
    }

    const deliveryAreas = await db.deliveryModel.findOne({where: {vendor_id: user.id}});

    if (!deliveryAreas) {
        if (areas) {
            let data = {
                "vendor_id": user.id,
                "areas": areas
            }
            db.deliveryModel.create(data);
        }
    } else {
        if (areas) {
            Object.assign(deliveryAreas, {areas: areas});
            await deliveryAreas.save();
        } else {
            await deliveryAreas.destroy();
        }
    }

    res.status(200).json({message: "Delivery areas updated successfully"});
}

