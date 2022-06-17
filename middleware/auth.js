'use strict';

const jwt = require("jsonwebtoken");

const config = process.env;

exports.auth = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({message: "Authorization Bearer token is required!"});
  }
  try {
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, `${config.TOKEN_KEY}`);
    req.user = decoded.sub;
  } catch (err) {
    return res.status(401).json({message: "unauthorized"});
  }
  return next();
};