// backend/controllers/messageController.js
const Message = require("../routes/messages");
const getMessages = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM messages ORDER BY timestamp ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createMessage = async (req, res) => {
  const { text, sender } = req.body;
  try {
    await pool.query("INSERT INTO messages (text, sender) VALUES (?, ?)", [
      text,
      sender || "Admin",
    ]);
    res.status(201).json({ message: "Message sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getMessages,
  createMessage,
};
