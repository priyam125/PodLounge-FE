import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/shared/Navigation";
import "./index.css";
import Authenticate from "./pages/Authenticate";
import Rooms from "./pages/Rooms";
import React from "react";
import Activate from "./pages/Activate";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
      <Routes>
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              {" "}
              <Rooms />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;



//GuestRoute = Home/Welcome page, Authenticate Step 1 and 2(Phone/Email && OTP)
const GuestRoute = ({ children, ...rest }) => {
  const isUserLoggedIn = false;

  console.log("isUserLoggedIn", isUserLoggedIn);
  return isUserLoggedIn ? (
    <Navigate to="/rooms" />
  ) : (
    React.cloneElement(children, { ...rest })
  );
  // return isUserLoggedIn ? <Navigate to="/" /> : children;
};

//SemiProtectedRoute = Activate Step 1 and 2(Full Name && Avatar)
const SemiProtectedRoute = ({ children, ...rest }) => {
  // const isUserLoggedIn = {
  //   isActivated: true,
  // };
  const isUserLoggedIn = false;
  return !isUserLoggedIn ? (
    <Navigate to="/" />
  ) : isUserLoggedIn && !isUserLoggedIn?.isActivated ? (
    React.cloneElement(children, { ...rest })
  ) : (
    <Navigate to="/rooms" />
  );
};


//ProtectedRoute = Rooms, Single Room, Profile
const ProtectedRoute = ({ children, ...rest }) => {
  const isUserLoggedIn = false;
  return !isUserLoggedIn ? (
    <Navigate to="/" />
  ) : isUserLoggedIn && !isUserLoggedIn?.isActivated ? (
    <Navigate to="/activate" />
  ) : (
    React.cloneElement(children, { ...rest })
  );
};
