const salesExecutive = require("../models/salesExecutive");

exports.signUp = async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      experienceYears,
    } = req.body;
    if (
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !experienceYears
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await salesExecutive.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSalesExecutive = new salesExecutive({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      experienceYears,
      username,
      password: hashedPassword,
    });
    await newSalesExecutive.save();
    const token = generateToken(newSalesExecutive);
    res.status(201).json({ message: "Sign up successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const validSalesExecutive = await salesExecutive.findOne({ username });
    if (!validSalesExecutive) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      validSalesExecutive.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = generateToken(validSalesExecutive);
    res
      .status(200)
      .json({ message: "Login successful", token, role: "salesExecutive" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getSalesExecutive = async (req, res) => {
  try {
    const salesExecutives = await salesExecutive.find();

    res.status(200).json(salesExecutives);
  } catch (error) {
    console.log(error);
  }
};

exports.add = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      experienceYears,
      username,
      password,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !experienceYears ||
      !username ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newSalesExecutive = new salesExecutive({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      experienceYears,
      username,
      password,
    });
    await newSalesExecutive.save();
    res.status(201).json({
      message: "Sales executive added successfully",
      newSalesExecutive,
    });
  } catch (error) {
    console.error("Error adding sales executive:", error);
    res
      .status(500)
      .json({ message: "Error adding sales executive", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const executive = await salesExecutive.findById(id);
    if (!executive) {
      return res.status(404).json({ message: "Sales executive not found" });
    }
    res.status(200).json(executive);
  } catch (error) {
    console.error("Error fetching sales executive:", error);
    res.status(500).json({
      message: "Error fetching sales executive",
      error: error.message,
    });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedExecutive = await salesExecutive.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExecutive) {
      return res.status(404).json({ message: "Sales executive not found" });
    }
    res.status(200).json({
      message: "Sales executive updated successfully",
      updatedExecutive,
    });
  } catch (error) {
    console.error("Error updating sales executive:", error);
    res
      .status(500)
      .json({
        message: "Error updating sales executive",
        error: error.message,
      });
  }
};


exports.softDeleteById = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedExecutive = await salesExecutive.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true } 
    );

    if (!updatedExecutive) {
      return res.status(404).json({ message: "Sales executive not found" });
    }
    res.status(200).json({
      message: "Sales executive soft deleted successfully",
      updatedExecutive,
    });
  } catch (error) {
    console.error("Error soft deleting sales executive:", error);
    res.status(500).json({ message: "Error soft deleting sales executive", error: error.message });
  }
};