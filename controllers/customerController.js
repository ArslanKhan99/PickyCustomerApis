const jwt = require('jsonwebtoken');
const db = require('../database/connection_make.js');

exports.login_phone_password = async(req, res, next)=>{
    let {phone, password} = req.body;

    const user = await db.customer.scope('withHash').findOne({ where: { phone: phone } });

    if (!user || password !== user.password) {
        next('Phone or password is incorrect');
        return;
    }

    const token = jwt.sign({ sub: user }, process.env.TOKEN_KEY, { expiresIn: '30d' });

    res.status(200).json({ data: user, token , token_type: 'bearer', token_validity: 10080});

};

exports.register_phone_password = async(req, res, next)=>{
    let usr = req.body;

    let eUser = await db.customer.findOne({ where: {phone: usr.phone}});

    if (eUser){
        next('User with phone already registered');
        return;
    }

    usr.refer_by_customer = usr.referal_code;
    usr.created_at = new Date().getTime();
    usr.updated_at = new Date().getTime();
    usr.user_name = usr.phone;

    usr.referal_code = randomString(9, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const user = await db.customer.create(usr);

    if(!user){
        next('Error while creating the customer account.');
        return;
    }

    Object.assign(user, {referal_code: `${user.referal_code}${user.id}`});

    await user.save();

    const token = jwt.sign({ sub: user }, process.env.TOKEN_KEY, { expiresIn: '30d' });

    res.status(200).json({token , token_type: 'bearer', token_validity: 10080});

};

exports.add_address = async(req, res, next)=>{
    let usr = req.user;
    let data = req.body;

    data.user_id = usr.id;
    data.created_at = new Date().getTime();
    data.updated_at = new Date().getTime();

    const address = await db.customer_addresses.create(data);

    if(!address){
        next('Error while creating the customer address.');
        return;
    }

    if(data.is_default){
        await makeDefaultAddress(address.id, address.user_id);
    }

    res.status(200).json(address);

};

exports.delete_address = async(req, res, next)=>{
    let id = req.query.id;

    await db.customer_addresses.destroy({where: {id: id}});

    res.status(200).json({message: "Address deleted Successfully."});

};

exports.edit_address = async(req, res, next)=>{
    let data = req.body;

    const address = await db.customer_addresses.findByPk(data.id);

    if(!address){
        next('Error while updating the customer address.');
        return;
    }

    Object.assign(address, data);

    await address.save();

    res.status(200).json(address);

};

exports.login_with_email = async(req, res, next)=>{
    let usr = req.body;

    let user = await db.customer.findOne({ where: {email: usr.email}});

    if (!user){
        usr.created_at = new Date().getTime();
        usr.updated_at = new Date().getTime();
        usr.user_name = usr.email;
        usr.referal_code = randomString(9, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        user = await db.customer.create(usr);

        if (!user) {
            next('Error while creating the customer account.');
            return;
        }

        Object.assign(user, {referal_code: `${user.referal_code}${user.id}`});

        await user.save();

    }

    const token = jwt.sign({sub: user}, process.env.TOKEN_KEY, {expiresIn: '30d'});

    res.status(200).json({data: user, token , token_type: 'bearer', token_validity: 10080});

};


exports.login_with_phone = async(req, res, next)=>{
    let usr = req.body;

    let user = await db.customer.findOne({ where: {phone: usr.phone}});

    if (!user){
        usr.created_at = new Date().getTime();
        usr.updated_at = new Date().getTime();
        usr.user_name = usr.phone;
        usr.referal_code = randomString(9, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        user = await db.customer.create(usr);

        if (!user) {
            next('Error while creating the customer account.');
            return;
        }

        Object.assign(user, {referal_code: `${user.referal_code}${user.id}`});

        await user.save();

    }

    const token = jwt.sign({sub: user}, process.env.TOKEN_KEY, {expiresIn: '30d'});

    res.status(200).json({data: user, token , token_type: 'bearer', token_validity: 10080});

};

exports.login_with_apple_id = async(req, res, next)=>{
    let usr = req.body;

    let user = await db.customer.findOne({ where: {apple_id: usr.apple_id}});

    if (!user){
        usr.created_at = new Date().getTime();
        usr.updated_at = new Date().getTime();
        usr.user_name = "IPhone";
        usr.referal_code = randomString(9, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        user = await db.customer.create(usr);

        if (!user) {
            next('Error while creating the customer account.');
            return;
        }

        Object.assign(user, {referal_code: `${user.referal_code}${user.id}`});
        Object.assign(user, {user_name: `${user.user_name}${user.id}`});

        await user.save();

    }

    const token = jwt.sign({sub: user}, process.env.TOKEN_KEY, {expiresIn: '30d'});

    res.status(200).json({data: user, token , token_type: 'bearer', token_validity: 10080});

};

exports.update_customer = async(req, res, next)=>{
    let usr = req.user;

    let data = req.body;

    let user = await db.customer.findOne({ where: {id: usr.id}});

    if(!user){
        next('No user found');
        return;
    }

    Object.assign(user, data);

    await user.save();

    res.status(200).json(user);

};

exports.update_fcm_token = async(req, res, next)=>{
    let usr = req.user;

    let {token} = req.query;

    let user = await db.customer.findOne({ where: {id: usr.id}});

    if(!user){
        next('No user found');
        return;
    }

    Object.assign(user, {token: token});

    await user.save();

    res.status(200).json({message: 'success'});

};

exports.reset_password = async(req, res, next)=>{
    let usr = req.body;

    let user = await db.customer.findOne({ where: {phone: usr.phone}});

    if(!user){
        next('No user found with that phone.');
        return;
    }

    Object.assign(user, usr);

    await user.save();

    res.status(200).json({message: "Password changed successfully."});

};


exports.user_details = async(req, res, next)=>{
    let usr = req.user;

    let user = await db.customer.findByPk(usr.id);

    if (!user){
        next('No such user found');
    }

    res.status(200).json(user);

};

exports.earned_points = async(req, res, next)=>{
    let usr = req.user;

    let points = await db.customer_points.findAll({where: {user_id: usr.id}});

    if (!points){
        next('No such user found');
    }

    res.status(200).json({message: "User all points found", points});

};

exports.customer_addresses = async(req, res, next)=>{
    let usr = req.user;

    let addresses = await db.customer_addresses.findAll({where: {user_id: usr.id}});

    if (!addresses){
        next('No such user found');
    }

    res.status(200).json(addresses);

};


exports.refreshToken =  async(req,res,next)=>{
    let usr = req.user;

    const user = await db.customer.findByPk(usr.id);

    const token = jwt.sign({ sub: user }, process.env.TOKEN_KEY, { expiresIn: '30d' });

    res.status(200).json({ data: user, token, token_type: 'bearer', token_validity: 10080 });

};


exports.change_password =  async(req,res,next)=>{

    let usr = req.user;

    let {old_password, new_password} = req.body;

    const user = await db.customer.scope('withHash').findByPk(usr.id);

    if (!user) {
        next('No user exists or may be deleted');
        return;
    }

    if(user.password !== old_password) {
        next("old password does not match");
        return;
    }

    Object.assign(user, {password: new_password});

    await user.save();

    res.status(200).json({ message: "password changed successfully."});

};


async function makeDefaultAddress(address_id, user_id) {
    let user = await db.customer.findByPk(user_id);

    if(!user){
        return;
    }

    Object.assign(user, {default_address_id: address_id});
    await user.save();
}

function randomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}