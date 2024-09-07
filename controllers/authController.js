const storeManager = require("../models/storeManager");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const validStoreManager = await storeManager.findOne({ username });
    if (!validStoreManager) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      validStoreManager.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {}
};

// exports.signUp = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and password are required" });
//     }
//     const existingUser = await storeManager.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newStoreManager = new storeManager({
//       username,
//       password: hashedPassword,
//     });
//     await newStoreManager.save();
//     res.status(201).json({ message: "Sign up successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
