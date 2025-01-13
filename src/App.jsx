import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/shared/Navigation";
import "./index.css";
import Authenticate from "./pages/Authenticate";
import Rooms from "./pages/Rooms";
import React from "react";
import Activate from "./pages/Activate";
import { useAuth } from "./context/AuthContext";
import Room from "./pages/Room";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



//GuestRoute = Home/Welcome page, Authenticate Step 1 and 2(Phone/Email && OTP)
const GuestRoute = ({ children, ...rest }) => {

  const {user} = useAuth();

  const isAuthenticated = !!user;

  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? (
    <Navigate to="/rooms" />
  ) : (
    React.cloneElement(children, { ...rest })
  );
};

//SemiProtectedRoute = Activate Step 1 and 2(Full Name && Avatar)
const SemiProtectedRoute = ({ children, ...rest }) => {
  const {user} = useAuth();

  const isAuthenticated = !!user;

  return !isAuthenticated ? (
    <Navigate to="/" />
  ) : isAuthenticated && !user?.activated ? (
    React.cloneElement(children, { ...rest })
  ) : (
    <Navigate to="/rooms" />
  );
};


//ProtectedRoute = Rooms, Single Room, Profile
const ProtectedRoute = ({ children, ...rest }) => {

  const {user} = useAuth();

  const isAuthenticated = !!user;

  return !isAuthenticated ? (
    <Navigate to="/" />
  ) : isAuthenticated && !user?.activated ? (
    <Navigate to="/activate" />
  ) : (
    React.cloneElement(children, { ...rest })
  );
};
