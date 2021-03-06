import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Recover } from "./pages/Recover";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { AddContent } from "./pages/AddContent";
import { Question } from "./pages/Question";
import { QuestionContent } from "./pages/QuestionContent";
import { Admin } from "./pages/Admin";
import {
  ProtectedRoutes,
  LoggedUserRedirect,
} from "./components/ProtectedRoutes";
import { UserProfile } from "./pages/UserProfile";

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
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/question" element={<Question />} />
          <Route path="/question/:id" element={<QuestionContent />} />
          <Route path="/add-content" element={<AddContent />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
