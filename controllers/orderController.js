const Order = require("../models/order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      orderId,
      customerName,
      customerContactNumber,
      products,
      totalAmount,
    } = req.body;

    if (
      !orderId ||
      !customerName ||
      !customerContactNumber ||
      !products ||
      !totalAmount
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      orderId,
      customerName,
      customerContactNumber,
      products,
      totalAmount,
    });
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deleted: false }).populate(
      "products.productId",
      "medicineName price"
    );

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      deleted: false,
    }).populate("products.productId", "medicineName price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { customerName, customerContactNumber, products, totalAmount } =
      req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: req.params.id, deleted: false },
      { customerName, customerContactNumber, products, totalAmount },
      { new: true }
    ).populate("products.productId", "medicineName price");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({
        message: "Order soft deleted successfully",
        order: deletedOrder,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
