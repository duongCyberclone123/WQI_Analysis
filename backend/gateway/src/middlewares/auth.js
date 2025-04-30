require("dotenv").config();
const jwt = require('jsonwebtoken');

/**
 * Middleware xác thực JWT và phân quyền
 * Chỉ cho phép role là 'admin' truy cập.
 */
function auth() {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(400).json({ message: "Token format is Bearer <token>" });
    }
    const token = parts[1];

    try {
      // Giải mã token để lấy thông tin người dùng
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Kiểm tra xem user có phải là 'admin' không
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Insufficient rights" });
      }

      // Nếu là admin, tiếp tục với các yêu cầu tiếp theo
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

module.exports = auth;
