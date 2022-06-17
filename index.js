'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');

//routes
const userRoutes = require('./routes/auth.js');
const vendorRoutes = require('./routes/vendor.js');
const productRoutes = require('./routes/product.js');
const orderRoutes = require('./routes/order.js');

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

let con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: ""
  });

  con.connect((err) => {
    if(err){
      console.log(`Error connecting to Db ${err}`);
      return;
    }
    console.log('Connection established');
  });

app.use((req,res,next)=>{
    req.con = con;
    next();
});


app.use("/api/auth", userRoutes);
app.use("/api/", orderRoutes);
app.use("/api/", vendorRoutes);
app.use("/api/", productRoutes);


app.use(errorHandler);


app.listen(PORT, ()=> console.log(`Server is running on port http://localhost:${PORT}`));