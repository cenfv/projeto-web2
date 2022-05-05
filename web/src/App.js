import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css';

import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Login/Home';

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />  
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Cadastro />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
