require("dotenv").config();
const jwt = require('jsonwebtoken');

/**
 * Middleware xác thực JWT và phân quyền.
 * @param {Array} allowedRoles - Danh sách role được phép truy cập.
 * Ví dụ: auth(['admin']), auth(['admin', 'user'])
 */
function auth(allowedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Không có token được cung cấp" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(400).json({ message: "Định dạng token phải là Bearer <token>" });
    }

    const token = parts[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Gán thông tin user đã giải mã cho request

      // Kiểm tra quyền truy cập
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Không đủ quyền truy cập" });
      }

      next(); // Nếu hợp lệ, cho phép tiếp tục
    } catch (err) {
      return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
  };
}

module.exports = auth;
