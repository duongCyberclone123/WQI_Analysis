const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');

// Lấy danh sách tất cả người dùng (chỉ admin)
router.get('/users', auth(['admin']), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Cập nhật role người dùng
router.put('/users/:id/role', auth(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Role không hợp lệ' });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });

    await user.update({ role });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Có lỗi xảy ra', details: err.message });
  }
});


// Xoá người dùng
router.delete('/users/:id', auth(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    await user.destroy();
    res.json({ message: 'Đã xoá người dùng thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi máy chủ', details: err.message });
  }
});

module.exports = router;
