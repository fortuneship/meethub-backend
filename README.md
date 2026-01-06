# 🏢 MeetHub – Conference Room Booking System (Backend)

MeetHub is a conference room booking system backend built with **Node.js, Express, and MySQL**.  
It provides secure REST APIs for managing users, rooms, and bookings with **booking conflict prevention**, **role-based access control**, and **email notifications**.

---

## 🚀 Features

- User Authentication (JWT)
- Role-based Access Control (Admin & User)
- Conference Room Management
- Room Booking with Time Conflict Detection
- Booking Cancellation & Modification
- Calendar-friendly API responses
- Email Notifications (SMTP)
- Secure and Scalable Architecture

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (No ORM)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **Email Service:** SMTP (Gmail / SendGrid)
- **API Style:** REST

---

## 📁 Project Structure

meethub-backend/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── middlewares/
│ ├── config/
│ ├── utils/
│ ├── app.js
│ └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/meethub-backend.git
cd meethub-backend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Configuration

Create a .env file from the example:

cp .env.example .env

.env.example

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=meethub

JWT_SECRET=your_jwt_secret_here

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

⚠️ Never commit .env to version control

🗄️ Database Setup

Create the database:

CREATE DATABASE meethub;


Create required tables:

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('ADMIN','USER') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  location VARCHAR(100),
  capacity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  room_id INT,
  start_time DATETIME,
  end_time DATETIME,
  status ENUM('BOOKED','CANCELLED') DEFAULT 'BOOKED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


▶️ Running the Server
npm run dev


or

node src/server.js


Server will start at:

http://localhost:5000

🔐 Authentication

MeetHub uses JWT-based authentication.

Send the token in request headers:

Authorization: Bearer <your_token>

📡 API Endpoints
Authentication

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and receive JWT |

Rooms

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and receive JWT |

Bookings

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | `/api/bookings`       | Book a room             |
| GET    | `/api/bookings`       | List bookings           |
| PUT    | `/api/bookings/:id`   | Modify booking          |
| DELETE | `/api/bookings/:id`   | Cancel booking          |
| POST   | `/api/bookings/check` | Check room availability |


🧠 Booking Conflict Detection

SELECT * FROM bookings
WHERE room_id = ?
AND status = 'BOOKED'
AND (start_time < ? AND end_time > ?);


This prevents double booking automatically.

📧 Email Notifications

Booking confirmation emails

Booking cancellation alerts

SMTP-based implementation (Gmail / SendGrid)

🧪 Testing

API tested using Postman

Manual testing for time conflicts and edge cases

🚀 Deployment

Recommended platforms:

Backend: Render, Railway, AWS, DigitalOcean

Database: AWS RDS, PlanetScale

Frontend: Vercel, Netlify

🔐 Security Best Practices

Password hashing using bcrypt

JWT expiration and validation

Role-based authorization middleware

Environment variables secured

👩‍💻 Maintained By

MeetHub Engineering Team

📜 License

MIT License