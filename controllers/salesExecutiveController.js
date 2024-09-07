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
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
