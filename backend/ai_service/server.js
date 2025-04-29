const app = require('./src/app');
const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
    console.log(`AI Service is running on port ${PORT}`);
});
