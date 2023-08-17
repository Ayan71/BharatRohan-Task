import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
