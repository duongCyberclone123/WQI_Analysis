const express = require('express');
const cors = require('cors');
const monitorRoutes = require('./routes/monitorRoutes');
const forecastRoutes = require('./routes/forecastRoutes');
const historyDataRoutes = require('./routes/historyDataRoutes');
const modelOptimizeRoutes = require('./routes/modelOptimizeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/monitor', monitorRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/api/history', historyDataRoutes);
app.use('/api/model', modelOptimizeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
