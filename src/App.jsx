import { Routes, Route } from 'react-router-dom'
import Autorization from './pages/autorization/autorization'
import Registration from './pages/registration/registration'
import Restoration from './pages/restoration/restoration'
import Chats from './pages/chats/chats'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Autorization />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/restoration" element={<Restoration />} />
      <Route path="/chats" element={<Chats />} />
    </Routes>
  )
}

export default App