// admin-frontend/src/Pages/Dashboard.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import MessageIcon from "@mui/icons-material/Message";
import { useState } from "react";
import UserManagement from "../Pages/UsersManagement";
import Events from "../Pages/Events";
import Messages from "../Pages/Messages";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("users");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderPage = () => {
    switch (selectedPage) {
      case "users":
        return <UserManagement />;
      case "events":
        return <Events />;
      case "messages":
        return <Messages />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <List>
          <ListItem
            button
            key="users"
            onClick={() => {
              setSelectedPage("users");
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem
            button
            key="events"
            onClick={() => {
              setSelectedPage("events");
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem
            button
            key="messages"
            onClick={() => {
              setSelectedPage("messages");
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
        {renderPage()}
      </Box>
    </Box>
  );
}

export default Dashboard;
