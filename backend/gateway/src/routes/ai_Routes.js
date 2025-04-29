const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

// Proxy các request có prefix '/api/ai' đến ai_service
router.use('/ai', createProxyMiddleware({
    target: 'http://localhost:8003',  // Giả sử ai_service chạy cổng 8003
    changeOrigin: true,
    pathRewrite: {
        '^/api/ai': '',  // Xóa prefix khi gửi qua ai_service
    },
}));

module.exports = router;
