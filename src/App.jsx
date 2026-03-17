import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from "react-hot-toast";
import Dashboard from './pages/Dashboard';
import Protected2 from './components/protected';
function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Protected2><Dashboard /></Protected2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App