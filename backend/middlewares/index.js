// middlewares.mjs
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv"
dotenv.config()
const { ACCESS_TOKEN_SECRET } = process.env;

export const verifyAccessToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(400).json({ status: false, message: "Token not found" });

  let user;

  try {
    user = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }

  try {
    user = await User.findById(user.id);

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const authSocketMiddleware = async(socket, next) => {
  // since you are sending the token with the query
  const token = socket.handshake.headers?.token;
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    socket.user = decoded;
    socket.user = await User.findById(socket.user.id);
    if (socket.user) {
      next();
    } else {
      return next(new Error("NOT AUTHORIZED"));
    }
  } catch (err) {
    console.log(err);
    return next(new Error("NOT AUTHORIZED"));
  }
};