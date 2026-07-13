# 🩸 BloodLink - Blood Donation Management System

BloodLink is a modern full-stack web application designed to bridge the gap between voluntary blood donors and hospitals through a secure and digital platform. It provides a streamlined workflow for donor registration, OTP-based email verification, blood request management, real-time notifications, health tracking, and automated digital certificate generation. The platform enables hospitals to efficiently manage blood requests while offering donors a seamless and engaging donation experience.

---

## 🚀 Key Features

*   **Secure Donor Registration**: Simple registration form featuring automated OTP email verification.
*   **Donor Dashboard**: Personal hub for managing availability, viewing pending blood requests, logging health indicators (hemoglobin, weight), and tracking badge milestones.
*   **Hospital Portal**: Secure hospital dashboard allowing staff to search for available donors by blood group in real-time and send emergency requests.
*   **Certificate & Badge System**: Digital certificate generation (with PDF download benefits) and badges awarded to repeat donors.
*   **Real-time Notifications**: Server-Sent Events (SSE) notifying donors instantly about emergency blood requests.
*   **JWT Authentication**: Secure authentication using HTTP-only cookies.
*   **Email Automation**: OTP verification and donation completion emails powered by Resend API.
*   **Responsive Design**: Optimized experience across desktop, tablet, and mobile devices.

---

## 🌐 Live Demo

- **Frontend:** https://bloodlink-drab.vercel.app
- **Backend:** https://bloodlink-backend-zux8.onrender.com

---

## 🛠️ Tech Stack

### Frontend
*   **React.js (v19)**: Component-driven user interface.
*   **React Router (v6)**: Single Page Application routing.
*   **Tailwind CSS (v4) & PostCSS**: Premium utility-first responsive styling.
*   **Framer Motion**: Smooth animations.
*   **Parcel**: Lightning-fast asset compiler and bundler.

### Backend
*   **Node.js & Express.js**: RESTful API server.
*   **MongoDB Atlas & Mongoose**: Cloud document database and object modeling.
*   **JWT & Cookies**: Secure token-based authentication session handling.
*   **Resend API**: High-deliverability transactional email delivery (with fallback in local development).
*   **PDFKit**: Dynamic PDF certificate generation.
*   **bcrypt**: Password hashing for secure authentication.

---

## 📁 Folder Structure

```
/
├── README.md
├── backend/
│   ├── src/
│   │   ├── app.js               # Express entry point
│   │   ├── config/
│   │   │   └── database.js      # MongoDB Mongoose connection
│   │   ├── controllers/         # Request handling and logic
│   │   ├── models/              # Schema definitions (Donor, Hospital, Request, etc.)
│   │   ├── routes/              # Express route endpoints
│   │   └── utils/               # Service wrappers (email, certificates)
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── index.html               # Parcel entry page
    ├── src/
    │   ├── App.js               # Root UI component
    │   ├── config/
    │   │   ├── api.js           # API host config
    │   │   └── features.js      # Feature flags
    │   ├── context/             # Auth state provider
    │   ├── components/          # Reusable pages & modals
    │   └── index.css            # Stylesheets
    ├── package.json
    ├── vercel.json              # Vercel SPA routing
    └── .env.example
```

---

## ⚙️ Environment Variables Setup

### Backend (`backend/.env`)
Create a file named `.env` in the `backend/` directory:
```env
PORT=5555
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/BloodLink?retryWrites=true&w=majority
RESEND_API_KEY=your_resend_api_key_here
FRONTEND_URL=https://bloodlink-drab.vercel.app
NODE_ENV=development
```

### Frontend (`frontend/.env`)
Create a file named `.env` in the `frontend/` directory:
```env
REACT_APP_API_URL=http://localhost:5555
```

---

## 📦 Installation & Local Development

### 1. Prerequisites
Make sure you have [Node.js (v18+)](https://nodejs.org/) installed.

### 2. Database Configuration (MongoDB Atlas)
1. Register for a free tier database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Create a database user and copy the credentials.
3. In **Network Access**, click **Add IP Address** and whitelist `0.0.0.0/0` (Allow Access From Anywhere).
4. Get your connection string under **Connect** -> **Drivers** and update it in your `backend/.env`.

### 3. Install Dependencies
```bash
# Clone the repository
git clone https://github.com/Abhishek2327/-BloodLink.git
cd -BloodLink

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Run Locally
```bash
# In backend directory
npm start

# In frontend directory
npm start
```
- Backend will run on `http://localhost:5555`.
- Frontend will open on `http://localhost:1234`.

---

## 🔌 Core API Endpoints

### Donor Routes
*   `POST /api/donors/send-registration-otp`: Triggers email verification OTP.
*   `POST /api/donors/register`: Registers a donor (requires verified OTP).
*   `POST /api/donors/login`: Authenticates donor.
*   `GET /api/donors/available`: Fetch currently active/available donors.
*   `POST /api/donors/:id/health`: Log blood indicators.

### Hospital Routes
*   `POST /api/hospitals/login`: Authenticates hospital staff.
*   `POST /api/requests`: Create a new blood donation request.
*   `GET /api/requests/donor`: Fetch requests for currently logged donor.

---

## 🚀 Deployment Instructions

### Backend (Render Deployment)
1. Go to [Render](https://render.com) and create a **Web Service**.
2. Select your repository.
3. Set **Root Directory** to `backend`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables: `MONGODB_URI`, `RESEND_API_KEY`, `NODE_ENV=production`.

### Frontend (Vercel Deployment)
1. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Select your repository.
3. Set **Root Directory** to `frontend`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variable: `REACT_APP_API_URL` pointing to your Render backend domain.

---

## 🔮 Future Improvements
*   **Twilio SMS Integration**: Enable real-time emergency SMS alerts to donors.
*   **Geolocation Search**: Integrate Google Maps API to search for donors based on proximity distance.
*   **Hospital Verification**: Additional verification stages for registering new clinics/hospitals.
