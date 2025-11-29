require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongodb_config');
const youtubeRoutes = require('./routes/youtubeService-route');
const flashcardRoutes = require('./routes/flashCardService-route');
const feynmanRoutes = require('./routes/feynmannService-route');
const redis = require('./config/redis');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

// Connect to Database
connectDB();

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: "You are sending requests too quickly comarade. Please slow down."
});


app.use('/api', limiter);


// Redis connectivity test on server startup
(async () => {
  try {
    await redis.set("server:status", "Redis connected successfully!", { ex: 60 });
    const status = await redis.get("server:status");
    console.log("Redis connection success:", status);
  } catch (err) {
    console.error("Redis connection failed:", err.message);
  }
})();


// Routes
app.use('/api', youtubeRoutes);
app.use('/api', flashcardRoutes);
app.use('/api',feynmanRoutes)

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);



