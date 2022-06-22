const db = require('../database/connection_make.js');

exports.apply_promo_code = async (req, res, next) => {
    let user = req.user;
    let code = req.params.code;
    let amount = req.query.amount;

    const promo_code = await db.promo_codes.findOne({where: {status: 'live', code: code}});

    if(!promo_code){
        next('Promo Code not found or expired');
        return;
    }

    const user_claimed = await db.clamed_promo_codes.findOne({where: {promo_id: promo_code.id, user_id: user.id}});

    if(!user_claimed){
        next('You must claimed the promo first');
        return;
    }

    if(promo_code.minimum_bill > amount){
        next('Your amount must be at least '+promo_code.minimum_bill+'.');
        return;
    }

    if(`${promo_code.is_for_first_order}` === '1') {
        let user_orders = await db.orderModel.count({where: {user_id: user.id}});
        if(user_orders > 0) {
            next('This promo can apply only on first order');
            return;
        }
    }

    let user_orders = await db.orderModel.count({where: {user_id: user.id, coupon_id: promo_code.id}});
    if(user_orders > 0) {
        next('This promo is already used.');
        return;
    }

    let date = new Date(parseInt(`${promo_code.valid_before}`));
    let today = new Date();

    if(today.getTime() > date.getTime()) {
        next('Promo code expired');
        return;
    }


    res.status(200).json({message: "Promo codes", promo_codes: promo_code});
};


exports.all_promo_codes = async (req, res, next) => {

    const promo_codes = await db.promo_codes.findAll({where: {status: 'live'}});

    res.status(200).json({message: "Promo codes", promo_codes: promo_codes});
};

exports.claimed_promo_codes = async (req, res, next) => {

    let user = req.user;

    let promos = await db.clamed_promo_codes.findAll({where: {user_id: user.id}});

    let ids = [];

    promos.forEach(p => {
       ids.push(p.promo_id);
    });

    console.log(ids);

    const promo_codes = await db.promo_codes.findAll(
        {
            where: {
                status: 'live',
                id: ids
            },
        }
    );

    res.status(200).json({message: "Promo codes", promo_codes: promo_codes});
};

exports.claim_promo_code = async (req, res, next) => {
    let user = req.user;
    let id = req.params.id;

    let alreadyPromo = await db.clamed_promo_codes.findOne(
        {
            where: {
                promo_id: id,
                user_id: user.id,
            }
        }
    )

    if (alreadyPromo) {
        next("Promo already claimed");
        return;
    }

    let promo_codes = await db.promo_codes.findOne(
        {
            where: {
                id: id,
            }
        }
    )

    if (!promo_codes) {
        next("No such promo exists");
        return;
    }

    let data = {
        promo_id: id,
        user_id: user.id
    };

    await db.clamed_promo_codes.create(data);

    res.status(200).json({message: "Promo codes claimed"});
};
