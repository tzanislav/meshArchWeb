import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import { AuthProvider } from './context/AuthContext';
import Login from './Components/Login';
import Register from './Components/Register';
import CreateProject from './Components/CreateProject';
import ProjectList from './Components/ProjectList';
import ProjectDetail from './Components/ProjectDetail';
import ProjectView from './Components/ProjectView';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-project" element={<CreateProject/>} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/edit-project/:id" element={<ProjectDetail />} />
          <Route path="/project/:id" element={<ProjectView />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
