require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongodb_config');
const youtubeRoutes = require('./routes/youtubeService-route');
const flashcardRoutes = require('./routes/flashCardService-route');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Routes

app.use('/api', youtubeRoutes);
app.use('/api', flashcardRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);



