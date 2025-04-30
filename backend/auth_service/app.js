const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const authRoutes = require("./src/routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(process.env.PORT || 3001, () => {
    console.log("Auth service is running on port", process.env.PORT || 3001);
});

module.exports = app;
