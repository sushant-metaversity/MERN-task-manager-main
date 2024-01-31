// authControllers.mjs
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/token.js";
import { validateEmail } from "../utils/validation.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all the fields" ,status:false});
    }
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Please send string values only" ,status:false });
    }

    if (password.length < 4) {
      return res.status(400).json({ message: "Password length must be at least 4 characters" ,status:false });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid Email"  ,status:false});
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email is already registered" ,status:false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const token = createAccessToken({ id: newUser._id });
    delete newUser.password;
    res.status(200).json({ token, user:newUser, message: "Congratulations!! Account has been created for you..",status:true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" ,status:false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Please enter all details!!" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: false, message: "This email is not registered!!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: false, message: "Password incorrect!!" });

    const token = createAccessToken({ id: user._id });
    delete user.password;
    res.status(200).json({ token, user, status: true, message: "Login successful.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
