const db = require('../database/connection_make.js');

exports.notifications = async(req, res, next)=>{
    let user = req.user;

    const notifications = await db.notificationModel.findAll({where: {user_id: user.id}});

    res.status(200).json({"message": "notifications",
        "notifications": {
            "current_page": 1,
            "data": notifications,
            "first_page_url": "/?page=1",
            "from": 1,
            "last_page": 2,
            "last_page_url": "/?page=2",
            "links": [
                {
                    "url": null,
                    "label": "&laquo; Previous",
                    "active": false
                },
                {
                    "url": "/?page=1",
                    "label": "1",
                    "active": true
                },
                {
                    "url": "/?page=2",
                    "label": "2",
                    "active": false
                },
                {
                    "url": "/?page=2",
                    "label": "Next &raquo;",
                    "active": false
                }
            ],
            "next_page_url": "/?page=2",
            "path": "/",
            "per_page": 10,
            "prev_page_url": null,
            "to": 10,
            "total": 16
        }});
};


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