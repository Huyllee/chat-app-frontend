import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat";
import Login from "./pages/login";
import Register from "./pages/register";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Container className="text-secondary">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="8" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
