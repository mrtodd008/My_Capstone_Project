import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./../../Shared/Context/AuthContext"; // Adjust path

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
