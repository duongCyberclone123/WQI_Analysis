const express = require('express');
const app = express();
const adminRoutes = require('./src/routes/adminRoutes');
const deviceRoutes = require('./src/routes/deviceRoutes');
const monitorRoutes = require('./src/routes/monitorRoutes');
const alertRoutes = require('./src/routes/alertRoutes');
const reportRoutes = require('./src/routes/reportRoutes');
require('dotenv').config();
const cors = require('cors');

app.use(cors());

app.use(express.json());

// Các route
app.use('/api/admin', adminRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/monitor', monitorRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/report', reportRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Có lỗi xảy ra', details: err.message });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Data service running on port ${PORT}`));

module.exports = app;
