import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authCheck = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.redirect("/login");

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.redirect("/login");
    req.user = decoded;
    next();
  });
};