import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Fixtures from './components/Fixtures';
import Results from './components/Results';
import MatchDetails from './components/MatchDetails';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import UserPredictions from './components/UserPredictions';
import PredictionComponent from './components/PredictionComponent';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/results" element={<Results />} />
        <Route path="/predict/:matchId" element={<MatchDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-predictions" element={<UserPredictions />} />  {/* Check this route */}
        <Route path="/prediction" element={<PredictionComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
