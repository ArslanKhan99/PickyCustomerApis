const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');

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

//endRoutes
const mysql = require('mysql');
const path = require('path');
const errorHandler = require('./middleware/errorHandler.js');
const multer = require('multer');
const {uploadImage} = require("./controllers/vendorController.js");
const product = require("./routes/product.js");

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


app.use("/api/customer", customerRoutes);
app.use("/api", bannerRoutes);
app.use("/api", categoryRoutes);
app.use("/api", notificationRoutes);
app.use("/api", promoRoutes);
app.use("/api", reviewRoutes);
app.use("/api", orderRoutes);
app.use("/api", vendorRoutes);
app.use("/api", productRoutes);


app.use(errorHandler);


app.listen(PORT, ()=> console.log(`Server is running on port http://localhost:${PORT}`));