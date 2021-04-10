const Product = require("../models/product");
const Order = require("../models/order");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const order = require("../models/order");

// Create a new Order
module.exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get a single order by its id

module.exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler(`No Order with this id`, 404));
  }

  if (order.user.id !== req.user.id) {
    return next(
      new ErrorHandler(
        `No Order with this id for the user with id :${req.user.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//  Get all orders of currently logged in user

module.exports.userOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders from database(for admin)

module.exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");

  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update/Process the order (for admin)

module.exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler(`No Order with this id`, 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(`You have already delivered this order`, 400));
  }

  // console.log(order);

  order.orderItems.forEach(async (item) => {
    await upDateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order processed successfully",
  });
});

async function upDateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete order(for admin)

module.exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler(`No Order with this id`, 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(`Delivered order cannot be deleted`, 400));
  }

  // console.log(order);

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
