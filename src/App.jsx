// В основном файле маршрутизации
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Autorization from './pages/autorization/autorization';
import Registration from './pages/registration/registration';
import Chats from './pages/chats/chats';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Autorization />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </Router>
  );
}

export default App;