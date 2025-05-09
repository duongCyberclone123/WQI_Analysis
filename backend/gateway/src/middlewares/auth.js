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
      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Gán thông tin user đã giải mã cho request
      req.user = decoded;

      // Kiểm tra role tồn tại trong token
      if (!decoded.role) {
        return res.status(403).json({ message: "Token không chứa thông tin quyền truy cập" });
      }

      // Kiểm tra quyền truy cập
      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Không đủ quyền truy cập" });
      }

      next(); // Nếu hợp lệ, cho phép tiếp tục
    } catch (err) {
      // Thông báo chi tiết hơn khi lỗi
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token đã hết hạn" });
      }
      return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn", details: err.message });
    }
  };
}

module.exports = auth;

