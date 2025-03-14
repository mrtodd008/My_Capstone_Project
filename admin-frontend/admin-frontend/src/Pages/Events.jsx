import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Edit, Delete, Add, Description } from "@mui/icons-material";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // 'add', 'edit'
  const [selectedEvent, setSelectedEvent] = useState({
    id: null,
    DJName: "",
    date: "",
    Venue: "",
    Time: "",
    Description: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        console.error("API response is not an array:", response.data);
        setEvents([]); // Set to an empty array on error
      } // Replace with your backend URL
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleOpenDialog = (
    mode,
    event = {
      id: null,
      eventName: "",
      date: "",
      venue: "",
      time: "",
      description: "",
    }
  ) => {
    setDialogMode(mode);
    setSelectedEvent({ ...event });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    setSelectedEvent({ ...selectedEvent, [e.target.name]: e.target.value });
  };

  const handleSaveEvent = async () => {
    try {
      if (dialogMode === "add") {
        await axios.post("/api/events", selectedEvent);
      } else if (dialogMode === "edit") {
        await axios.put(`/api/events/${selectedEvent.id}`, selectedEvent);
      }
      fetchEvents();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpenDialog("add")}
      >
        Add Event
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>DJ Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog("edit", event)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteEvent(event.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogMode === "add" ? "Add Event" : "Edit Event"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="DJ Name"
            type="text"
            fullWidth
            name="djName"
            value={selectedEvent.djName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            name="date"
            value={selectedEvent.date}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Venue"
            type="text"
            fullWidth
            name="Venue"
            value={selectedEvent.venue}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Time"
            type="text"
            fullWidth
            name="Time"
            value={selectedEvent.time}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="Description"
            value={selectedEvent.description}
            onChange={handleInputChange}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveEvent}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Events;
