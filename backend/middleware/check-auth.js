const User = require("../models/user");

const auth = async (req, res, next) => {
  const { email, id } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (id == user._id) {
      req.user = user;
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: " Authentication failed!" });
  }
  next();
};

module.exports = auth;
