const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
app.use(express.json());

const authRoutes = require("./src/routes/auth");
app.use("/api/auth", authRoutes);

const adminProxy = require('./src/routes/adminProxy');
app.use('/api', adminProxy);

const reportRoutes = require('./src/routes/reportRoutes');
app.use('/api/report', reportRoutes); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Gateway is running on port", PORT);
});

module.exports = app;
