'use strict';

const jwt = require('jsonwebtoken');
const db = require('../database/connection_make.js');

exports.login = async(req, res, next)=>{
    let {phone, password} = req.body;

    const user = await db.vendor.findOne({ where: { phone: phone } });

    if (!user || password !== user.password) {
        next('Phone or password is incorrect');
        return;
    }

    const deliveryAreas = await db.deliveryModel.findOne({ where: { vendor_id: user.id } });

    const token = jwt.sign({ sub: user }, process.env.TOKEN_KEY, { expiresIn: '30d' });

    user.setDataValue('delivery_areas', [deliveryAreas]);

    res.status(200).json({ data: user, token , token_type: 'bearer'});

};

exports.checkPhone = async(req,res,next) => {
    let phone = req.params.phone;

    const user = await db.vendor.findOne({ where: { phone } });

    if (user) {
        next('Phone number already registered');
        return;
    }
    res.status(200).json({ message: "Phone no not registered"});
}

exports.refreshToken =  async(req,res,next)=>{
    let usr = req.user;

    const user = await db.vendor.findByPk(usr.id);

    const deliveryAreas = await db.deliveryModel.findOne({ where: { vendor_id: user.id } });

    const token = jwt.sign({ sub: user }, process.env.TOKEN_KEY, { expiresIn: '30d' });

    user.setDataValue('delivery_areas', [deliveryAreas]);

    res.status(200).json({ data: user, token });

};

exports.profile =  async(req,res,next)=>{
    let usr = req.user;

    const user = await db.vendor.findByPk(usr.id);

    const deliveryAreas = await db.deliveryModel.findOne({ where: { vendor_id: user.id } });

    user.setDataValue('delivery_areas', [deliveryAreas]);

    res.status(200).json(user);

};

exports.reset_password =  async(req,res,next)=>{

    let {phone, new_password} = req.body;

    const user = await db.vendor.findOne({ where: { phone } });

    if (!user)
        next('No user exists with this phone number');


    Object.assign(user, {password: new_password});

    await user.save();

    res.status(200).json({ message: "password reset successfully."});

};

exports.change_password =  async(req,res,next)=>{

    let usr = req.user;

    let {old_password, new_password} = req.query;

    if(!(old_password && new_password))
        next('Missing parameters old_password or new_password');

    const user = await db.vendor.findByPk(usr.id);

    if (!user)
        next('No user exists or may be deleted');

    console.log(user.password);
    console.log(old_password);
    console.log(new_password);

    if(user.password !== old_password) {
        next("old password does not match");
        return;
    }

    Object.assign(user, {password: new_password});

    await user.save();

    res.status(200).json({ message: "password changed successfully."});

};

exports.edit_profile =  async(req,res,next)=>{
    let usr = req.user;

    let params = req.body;

    const user = await db.vendor.findByPk(usr.id);

    if (!user)
        next('No user exists or may be deleted');


    Object.assign(user, params);

    await user.save();

    res.status(200).json({ message: "profile changed successfully."});

};

exports.register =  async(req,res, next)=>{
    let user = req.body;

    const usr = await db.vendor.findOne({ where: { phone: user.phone } });

    if (usr)
        next('Phone number already registered');
    await db.vendor.create(user);

    const registerUser = await db.vendor.findOne({ where: { phone: user.phone } });

    if(!registerUser)
        next('User cannot be registered at this time. try again after sometime');

    const token = jwt.sign({ sub: registerUser }, process.env.TOKEN_KEY, { expiresIn: '30d' });

    registerUser.setDataValue('delivery_areas', []);

    res.status(200).json({ data: registerUser, token });

};