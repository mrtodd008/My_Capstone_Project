// backend/index.js
const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");
const messageRoutes = require("./routes/messages");
const sequelize = require("./db");
require("dotenv").config();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
