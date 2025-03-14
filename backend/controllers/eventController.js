// backend/controllers/eventController.js
const Event = require("../routes/events");

const getEvents = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM events");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createEvent = async (req, res) => {
  const { eventName, date, location, description } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO events (eventName, date, location, description) VALUES (?, ?, ?, ?)",
      [eventName, date, location, description]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEvent = async (req, res) => {
  const { eventName, date, location, description } = req.body;
  const { id } = req.params;
  try {
    await pool.query(
      "UPDATE events SET eventName = ?, date = ?, location = ?, description = ? WHERE id = ?",
      [eventName, date, location, description, id]
    );
    res.json({ id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM events WHERE id = ?", [id]);
    res.json({ message: "Event deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
