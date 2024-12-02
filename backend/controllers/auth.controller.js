import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields 'email', 'password' and 'name' are required",
      });
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }
    console.log(password);
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification token or expired token',
      });
    }
    user.isVerified = true;
    user.verificationExpiresAt = undefined;
    user.verificationToken = undefined;
    await user.save();
    await sendWelcomeEmail(user);
    res.status(200).json({
      success: true,
      message: 'Email verification successful',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(`Error verifying email`, error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const login = async (req, res) => {
  res.send('GET /login');
};
export const logout = async (req, res) => {
  res.send('GET /logout');
};
