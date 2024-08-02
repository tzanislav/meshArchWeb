import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';


function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
