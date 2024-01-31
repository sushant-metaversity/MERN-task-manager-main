// token.mjs
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const ACCESS_TOKEN_SECRET  = process.env.ACCESS_TOKEN_SECRET;

const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET);
};

export { createAccessToken };
