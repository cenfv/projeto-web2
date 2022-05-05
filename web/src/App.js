import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Recover } from './pages/Recover';

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />  
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/recover" element={<Recover />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
