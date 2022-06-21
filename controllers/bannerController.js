const db = require('../database/connection_make.js');

exports.get_ads_list = async(req, res, next)=>{

    const ads = await db.promotional_ads.findAll();

    res.status(200).json({message: "All promotional ads", data: ads});

};