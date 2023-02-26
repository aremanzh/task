import jwt from "jsonwebtoken";

function requireSignIn(req, res, next) {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("DECODE => ", decoded);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json(err);
  }
}

export default requireSignIn

