//const Order = require("../../models/OrderModel");
const ErrorHandler = require("../../utils/ErrorHandler.js");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Product = require("../../models/ProductModel");
const express=require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
// Create Order
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "thesis",
  });
exports.createOrderSQL = catchAsyncErrors(async (req,res,next) =>{

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    db.query(
        "INSERT INTO ecom (shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,shippingPrice,totalPrice) VALUES (?,?,?,?,?,?,?)",
        [shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,shippingPrice,totalPrice],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted in mysql");
          }
        }
      );
});

// db.query(
//     "INSERT INTO ecom (shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,shippingPrice,totalPrice) VALUES (?,?,?,?,?,?,?)",
//     [shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice,shippingPrice,totalPrice],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted in mysql");
//       }
//     }
//   );

 //Get Single order
// exports.getSingleOrder = catchAsyncErrors(async (req,res,next) =>{
//     const order = await Order.findById(req.params.id).populate(
//         "user",
//         "name email"
//     );

//     if(!order){
//         return next(new ErrorHandler("Order not found with this id",404));
//     }

//     res.status(200).json({
//         success: true,
//         order
//     });
// });

// // Get all orders
// exports.getAllOrders = catchAsyncErrors(async (req,res,next) =>{
//     const orders = await Order.find({user: req.user._id});
//     res.status(200).json({
//         success: true,
//         orders
//     });
// });

// // Get All orders ---Admin
// exports.getAdminAllOrders = catchAsyncErrors(async (req,res,next) =>{
//     const orders = await Order.find();

//     let totalAmount = 0;

//     orders.forEach((order) =>{
//         totalAmount += order.totalPrice;
//     });

//     res.status(200).json({
//         success: true,
//         totalAmount,
//         orders
//     });
// });

// // update Order Status ---Admin
// exports.updateAdminOrder = catchAsyncErrors(async (req, res, next) => {

//     const order = await Order.findById(req.params.id);
  
//     if (!order) {
//       return next(new ErrorHandler("Order not found with this Id", 404));
//     }
  
//     if (order.orderStatus === "Delivered") {
//       return next(new ErrorHandler("You have already delivered this order", 400));
//     }
  
//     if (req.body.status === "Shipped") {
//       order.orderItems.forEach(async (o) => {
//         await updateStock(o.product, o.quantity);
//       });
//     }
//     order.orderStatus = req.body.status;
  
//     if (req.body.status === "Delivered") {
//       order.deliveredAt = Date.now();
//     }
  
//     await order.save({ validateBeforeSave: false });
//     res.status(200).json({
//       success: true,
//     });
//   });
  
//   async function updateStock(id, quantity) {
      
//     const product = await Product.findById(id);
  
//     product.Stock -= quantity;
  
//     await product.save({ validateBeforeSave: false });
//   }


// // delete Order ---Admin
// exports.deleteOrder = catchAsyncErrors(async (req,res,next) =>{

//     const order = await Order.findById(req.params.id);
    
//     if(!order){
//       return next(new ErrorHandler("Order not found with this Id", 404));
//     }

//     await order.remove();

//     res.status(200).json({
//         success: true,
//     });
// });


app.get('/ordersql',(req,res)=>{
  res.send("hello from ordersql")
})

app.listen(9000,()=>{
  console.log("cart app started");
})