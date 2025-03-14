// backend/models/message.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Message = sequelize.define("Message", {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sender: {
    type: DataTypes.STRING,
    defaultValue: "Admin",
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Message;
