import { asyncHandler } from "../../util/index.js";
import jwt from "jsonwebtoken";

export const authUser = asyncHandler(async (req, res, next) => {
  const {token} = req.cookies;
  
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Login to Access this Resouse" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { id: decoded.id, college_id:decoded.id, role_id:decoded.role_id };
  next();
});

// And an authorize helper:
export const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Access denied" });
    }
    next();
  };
