import { AppBar, Toolbar, Typography, Switch } from "@mui/material";

function Topbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
