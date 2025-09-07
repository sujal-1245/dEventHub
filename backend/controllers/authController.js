import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // always create normal user (isAdmin = false)
    const user = await User.create({
      name,
      email,
      password,
    });

    // return response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, // will be false by default
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin, // 👈 return this
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get user profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate("resumes");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
