import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navigation from "./components/shared/Navigation"
import "./index.css"
import Register from "./pages/Register"

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
