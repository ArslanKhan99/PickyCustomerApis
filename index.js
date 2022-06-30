const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const admin = require("firebase-admin");

//routes
const bannerRoutes = require('./routes/banner.js');
const vendorRoutes = require('./routes/vendor.js');
const productRoutes = require('./routes/product.js');
const orderRoutes = require('./routes/order.js');
const customerRoutes = require('./routes/customer.js');
const categoryRoutes = require('./routes/category.js');
const notificationRoutes = require('./routes/notification.js');
const promoRoutes = require('./routes/promo.js');
const reviewRoutes = require('./routes/review.js');
const salesRoutes = require('./routes/sales.js');
const braintreeRoutes = require('./routes/braintree.js');

let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://picky-803de-default-rtdb.firebaseio.com"
});


//endRoutes
const path = require('path');
const errorHandler = require('./middleware/errorHandler.js');
const multer = require('multer');
const {uploadImage} = require("./controllers/vendorController.js");

let storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

const uploadMulter = multer({
    storage: storage
});

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 5000;



app.post('/api/uploadImage', uploadMulter.single('photo'), uploadImage);

app.use(bodyParser.json());
app.use(upload.array());
app.use(function(req, res, next) {
    req.firebase_admin = admin;
    next();
});


app.use("/api/customer", customerRoutes);
app.use("/api", bannerRoutes);
app.use("/api", categoryRoutes);
app.use("/api", notificationRoutes);
app.use("/api", promoRoutes);
app.use("/api", reviewRoutes);
app.use("/api", orderRoutes);
app.use("/api", vendorRoutes);
app.use("/api", productRoutes);
app.use("/api", salesRoutes);
app.use("/api", braintreeRoutes);


app.use(errorHandler);


app.listen(PORT, ()=> console.log(`Server is running on port http://localhost:${PORT}`));