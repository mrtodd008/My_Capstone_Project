import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout";
import UsersManagement from "../Pages/UsersManagement";
import Events from "../Pages/Events";
import Messages from "../Pages/Messages";

const AdminRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <UsersManagement />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <UsersManagement />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <Events />
            </Layout>
          }
        />
        <Route
          path="/messages"
          element={
            <Layout>
              <Messages />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AdminRoutes;
