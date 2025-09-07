import User from "../models/User.js";

// @desc Get total number of users
// @route GET /api/users/count
// @access Admin (or public if you want)
export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
