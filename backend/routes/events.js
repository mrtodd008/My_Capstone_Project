// backend/models/event.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Event = sequelize.define("Event", {
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
  },
  location: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Event;
