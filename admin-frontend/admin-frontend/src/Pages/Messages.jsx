import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import axios from "axios";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    scrollToBottom();
    const interval = setInterval(fetchMessages, 3000); // Poll for new messages every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("/api/messages");
      if (Array.isArray(response.data)) {
        // Replace with your backend URL
        setMessages(response.data);
      } else {
        console.error("API response is not an array:", response.data);
        setMessages([]); // Set to an empty array on error
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await axios.post("/api/messages", { text: newMessage });
        setNewMessage("");
        fetchMessages(); // Refresh messages after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "80vh" }}>
      <Paper sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} alignItems="flex-start">
              <ListItemText primary={message.text} secondary={message.sender} />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>

      <Box sx={{ p: 2, display: "flex" }}>
        <TextField
          fullWidth
          label="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button variant="contained" sx={{ ml: 1 }} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Messages;
