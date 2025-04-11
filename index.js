const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.url}/persons?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
.then(console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
const personRoutes = require('./routes/activities');
app.use('/person', personRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));