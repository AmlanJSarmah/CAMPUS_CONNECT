const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
res.json({ message : "Welcome to Campus Connect API" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});