import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat";
import Login from "./pages/login";
import Register from "./pages/register";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container className="text-secondary">
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/login" element={user ? <Chat /> : <Login />} />
          <Route path="/register" element={user ? <Chat /> : <Register />} />
          <Route path="8" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;
