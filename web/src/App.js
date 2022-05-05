import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css';

import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />  
      <Route exact path="/cadastro" element={<Cadastro />} />  
    </Routes>
    </BrowserRouter>
  )
}

export default App;
