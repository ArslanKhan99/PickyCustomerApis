const db = require('../database/connection_make.js');

exports.get_categories_list = async(req, res, next)=>{

    const categories = await db.categories.findAll();

    res.status(200).json({message: "All categories", data: categories});

};

exports.top_categories = async(req, res, next)=>{

    const categories = await db.categories.findAll(
        {
            where: {
                id: [6,7]
            }
        }
    );

    res.status(200).json({message: "Top categories", data: categories});

};

exports.get_sub_categories = async(req, res, next)=>{
    let id = req.params.id;
    const sub_categories = await db.sub_categories.findAll(
        {
            where: {
                id: id
            }
        }
    );

    res.status(200).json({message: "All sub_categories", data: sub_categories});

};

exports.category_colors_sizes = async(req, res, next)=>{
    let id = req.query.category_id;

    const colors = await db.colorsModel.findAll();
    const sizes = await db.colorsModel.findAll();

    let cat_colors = [];
    let cat_sizes = [];

    for (let i=0; i< colors.length; i++) {
        let catIds = colors[i].category_ids.split(',');
        if(catIds.includes(`${id}`)) {
            cat_colors.push(colors[i]);
        }
    }

    for (let i=0; i< sizes.length; i++) {
        let catIds = sizes[i].category_ids.split(',');
        if(catIds.includes(`${id}`)) {
            cat_sizes.push(sizes[i]);
        }
    }

    res.status(200).json({message: "colors and sizes", data: {colors: cat_colors, sizes: cat_sizes}});

};