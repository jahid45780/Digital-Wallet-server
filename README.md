# 💰 Digital Wallet API

A secure, modular, and role-based backend API for a digital wallet system (similar to Bkash/Nagad) built with Express.js, TypeScript, and MongoDB.

---

## 🚀 Features

### Authentication
- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access (Admin, User, Agent)

###  User Features
- Register & Login
- Auto wallet creation (initial balance: ৳50)
- Add money
- Withdraw money
- Send money to another user
- View personal transaction history

### Agent Features
- Cash-in (add money to user's wallet)
- Cash-out (withdraw money from user's wallet)
- Commission system (1%)

###  Admin Features
- View all users
- View all agents
- View all wallets
- View all transactions
- Block / Unblock wallets
- Approve / Suspend agents

###  Wallet System
- One wallet per user/agent
- Wallet status (active / blocked)
- Balance management

###  Transaction System
- Tracks all operations:
  - addMoney
  - withdraw
  - sendMoney
  - cashIn
  - cashOut
- Transaction fee support
- Atomic operations using MongoDB transactions

---

##  Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Zod (validation)

---


