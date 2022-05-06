import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Recover } from "./pages/Recover";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import {
  ProtectedRoutes,
  LoggedUserRedirect,
} from "./components/ProtectedRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<LoggedUserRedirect />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/recover" element={<Recover />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
