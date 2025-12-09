Markdown

# Employee Management System

A simple full-stack app to add, view, edit, and delete employee records. It also has a basic analytics view and an email notification feature.

Built with: **React, Node.js, Express, MySQL.**

## 1. Database Setup

Create a database in MySQL and run this SQL to create the table:

```sql
CREATE DATABASE employeeSystem;
USE employeeSystem;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  location VARCHAR(100),
  position VARCHAR(100),
  wage INT
);
Note: Go to backend/config/db.js and update the password field with your own MySQL password.

2. How to Run
You need two terminals open.

Terminal 1 (Backend)

Bash
cd backend
npm install
npm start
Server runs on port 3001.

Terminal 2 (Frontend)

Bash
cd client
npm install
npm start
React runs on port 3000.

Features
CRUD: Add, Update, Delete users.

Analytics: Shows a count of users grouped by location.

Notifications: Button to simulate sending an email.
```
