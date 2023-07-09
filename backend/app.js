const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({useTempFiles: true}));
//redis db
const axios = require('axios');
const { getCache, setCache } = require('./caching');
//const app = express();

//const { BASE_URL } = process.env;
const cacheKey = `getAll/`;

//Middleware
app.use(bodyParser.json());

//REDIS DATABASE SERVER
app.get('/getAll', async (req, res, next) => {
    try{
        const response = {};
        const cacheData = await getCache(cacheKey);
        if(cacheData) {
            response['message'] = 'cache hit';
            response['posts'] = JSON.parse(cacheData);
        }else {
            const result = await axios.get("http://localhost:4000");
            const { data } = result;
            response['message'] = 'cache miss';
            response['posts'] = data;
            setCache(cacheKey, data);
        }
        res.status(200).send(response);
    }catch(err) {
        res.status(400).send(err);
    }
   
})



// config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })}

// Route imports
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");
const cart = require("./routes/WishListRoute");

app.use("/api/v2",product);

app.use("/api/v2",user);

app.use("/api/v2",order);

app.use("/api/v2",payment);

app.use("/api/v2",cart);




app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})

// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app