const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const donorRoutes = require('./routes/donorRoutes');
const requestRoutes = require('./routes/requestRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const app = express();

// Trust proxy for Render deployment (needed for req.secure and x-forwarded-proto to work)
// This allows Express to correctly detect HTTPS requests behind a reverse proxy
app.set('trust proxy', 1);

const FRONTEND_URL = process.env.FRONTEND_URL;
const ALLOWED_ORIGINS = [
    "https://bloodlink-drab.vercel.app",
    "https://blood-link-ashen.vercel.app",
    "http://localhost:1234",
    "http://localhost:57308"
];

if (FRONTEND_URL) {
    ALLOWED_ORIGINS.push(FRONTEND_URL);
}

// CORS configuration with proper origin handling
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Normalize origin: trim trailing slash and convert to lowercase for comparison
        const cleanOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
        
        const isAllowed = ALLOWED_ORIGINS.some(allowed => {
            const cleanAllowed = allowed.endsWith('/') ? allowed.slice(0, -1) : allowed;
            return cleanAllowed.toLowerCase() === cleanOrigin.toLowerCase();
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            // Log warning but return null, false to avoid throwing 500 error in Express
            console.warn(`Blocked CORS request from origin: ${origin}`);
            callback(null, false);
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());
app.use(cookieParser());

app.use('/api/donors', donorRoutes);

app.use('/api/requests', requestRoutes);//request means blood request.

app.use('/api/certificates', certificateRoutes);

app.use('/api/hospitals', hospitalRoutes);

app.use('/api/notifications', notificationRoutes);

connectDB().then(() => {
    console.log("Database connected successfully :)")
    // Listen on all network interfaces (0.0.0.0) to accept connections from other devices
    const PORT = process.env.PORT || 5555;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server listening on port ${PORT}...`);
        console.log(`Local access: http://localhost:${PORT}`);
        console.log(`Network access: http://YOUR_IP:${PORT}`);
    })
}).catch((err) => {
    console.log("Database connection failed!!!", err);
})