import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css';

import { Login } from './pages/Login';
import { Home } from './pages/Login/Home';

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />  
      <Route exact path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
