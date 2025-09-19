# 🎮 eSports Backend

This is the **backend API** for the eSports platform, built with **Node.js, Express, and MongoDB**.  
It handles authentication, tournaments, feedback, and user management.

---

## 🚀 Tech Stack
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **CORS & dotenv** for configuration

---

## 📂 Project Structure
**backend/**
│── models/ # Mongoose schemas (User, Tournament, Feedback, etc.)
│── routes/ # Express routes (auth, users, tournaments, feedback)
│── controllers/ # Route controllers
│── server.js # Entry point
│── .env # Environment variables

## 🔑 API Endpoints
## Users:
**GET** /api/users → Get all users
**DELETE** /api/users/:id → Delete a user

## Tournaments
**GET** /api/tournaments → Get all tournaments
**POST** /api/tournaments → Add a tournament
**DELETE** /api/tournaments/:id → Delete a tournament

## Feedback
**GET** /api/feedback → Get all feedbacks
**POST** /api/feedback → Submit feedback