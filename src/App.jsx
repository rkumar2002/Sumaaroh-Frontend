import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Guests from './components/Guests'; 
import Venues from './components/Venues';
import OutroPage from './components/OutroPage';
import Intro from './components/Intro';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path='/login' element={<Login/>}/>
        
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/guests" element={<ProtectedRoute><Guests /></ProtectedRoute>} />
        <Route path="/venues" element={<ProtectedRoute><Venues /></ProtectedRoute>} />
        <Route path="/outro" element={<ProtectedRoute><OutroPage/></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;