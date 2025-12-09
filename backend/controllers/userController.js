const db = require("../config/db");
const nodemailer = require("nodemailer");

// 1. GET ALL USERS
exports.getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
};

// 2. CREATE USER
exports.createUser = (req, res) => {
  const { name, email, location, position, wage } = req.body;
  db.query(
    "INSERT INTO users (name, email, location, position, wage) VALUES (?,?,?,?,?)",
    [name, email, location, position, wage],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User added");
    }
  );
};

// 3. UPDATE WAGE
exports.updateUser = (req, res) => {
  const { id, name, email, location, position, wage } = req.body;

  const sql =
    "UPDATE users SET name = ?, email = ?, location = ?, position = ?, wage = ? WHERE id = ?";

  db.query(sql, [name, email, location, position, wage, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
};

// 4. DELETE USER
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
};

// 5. ANALYTICS (Users by Location)
exports.getAnalytics = (req, res) => {
  db.query(
    "SELECT location, COUNT(*) as count FROM users GROUP BY location",
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
};

// 6. NOTIFICATION (Email)
exports.sendEmail = (req, res) => {
  const { email, name } = req.body;

  // NOTE: This is a test setup.
  // For real Gmail, you need an "App Password" from Google Account settings.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com", // <--- Your Email
      pass: "your_app_password", // <--- Your App Password
    },
  });

  const mailOptions = {
    from: "system@company.com",
    to: email,
    subject: "System Notification",
    text: `Hello ${name}, this is a test notification from the CRUD App.`,
  };

  // We are mocking success to prevent crashing if you don't have credentials yet
  console.log(`Sending email to ${email}...`);
  res.send("Email process simulated (Check console for setup details)");
};
