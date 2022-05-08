import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const adminRoutes = asyncHandler(async (req, res, next) => {
  let token;
  let decoded = {};
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.type === "admin") {
        next();
      }
      throw new Error();
    } catch (error) {
      if (decoded.type === "customer") {
        res.status(403);
        throw new Error("Access denied");
      }
      res.status(401);
      throw new Error("invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("no token");
  }
});

export { adminRoutes };
