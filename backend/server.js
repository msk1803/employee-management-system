const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

// Connect Routes
app.use("/users", userRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
