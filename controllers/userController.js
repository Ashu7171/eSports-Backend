const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create User (Register)
const createUser = async (req, res) => {
  try {
    const { fullName, gender, dob, mobile, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      gender,
      dob,
      email,
      password,
      role: role || "member", // default is member
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded admin email check
    if (email === 'admin@phoenix.com') {
      // For the hardcoded admin, we'll bypass database check
      // You can set a specific password for the admin or allow any password
      const ADMIN_PASSWORD = 'admin123'; // Set a specific password for admin
      
      if (password !== ADMIN_PASSWORD) {
        return res.status(400).json({ message: "Invalid admin credentials" });
      }

      // Create JWT token for admin
      const token = jwt.sign(
        { id: 'admin-id', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      
      return res.json({
        success: true,
        token,
        role: 'admin',
        message: "Admin login successful"
      });
    }

    // Regular user authentication
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Send response
    res.json({
      success: true,
      token,
      role: user.role,
      message: "Login successful"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User By ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    let updatedData = { ...rest };

    // Re-hash password if updating
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  createUser, 
  loginUser,   
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
};
