const Medicine = require("../models/medicine");

exports.createMedicine = async (req, res) => {
  try {
    const { name, manufacturer, price, stock, discount } = req.body;
    const newMedicine = new Medicine({
      name,
      manufacturer,
      price,
      stock,
      discount,
    });
    await newMedicine.save();
    res
      .status(201)
      .json({ message: "Medicine created successfully", newMedicine });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating medicine", error: error.message });
  }
};

exports.getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ deleted: false });
    res.status(200).json(medicines);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching medicines", error: error.message });
  }
};

exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ _id: req.params.id, deleted: false });
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching medicine", error: error.message });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const { name, manufacturer, price, stock, discount } = req.body;
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, manufacturer, price, stock, discount },
      { new: true }
    );
    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res
      .status(200)
      .json({ message: "Medicine updated successfully", updatedMedicine });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating medicine", error: error.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res
      .status(200)
      .json({ message: "Medicine soft deleted successfully", deletedMedicine });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting medicine", error: error.message });
  }
};
