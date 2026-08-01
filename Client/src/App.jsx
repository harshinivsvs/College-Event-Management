import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ViewEvents from "./pages/ViewEvents";
import EventDetails from "./pages/EventDetails";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Profile from "./pages/Profile";
import MyEvents from "./pages/MyEvents";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<ViewEvents />} />
        <Route path="/events/:id" element={<EventDetails />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Organizer Only */}
        <Route
          path="/add-event"
          element={
            <ProtectedRoute roles={["organizer"]}>
              <AddEvent />
            </ProtectedRoute>
          }
        />

        {/* Organizer Only */}
        <Route
          path="/edit-event/:id"
          element={
            <ProtectedRoute roles={["organizer"]}>
              <EditEvent />
            </ProtectedRoute>
          }
        />

        {/* Logged in Users */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;