import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, password,email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword ,email});
    await user.save();

    res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ success: false, error: 'Wrong Password' });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: '10d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { _id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to your dashboard!', user: req.user });
};

export { registerUser, loginUser, verify };

