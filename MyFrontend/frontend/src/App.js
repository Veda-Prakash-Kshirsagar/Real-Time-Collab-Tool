import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Navbar from './components/navbar';
import DocumentForm from './components/documentForm';
import DocumentDetails from './components/documentDetails';
import LandingPage from './components/landingPage';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/document/:id" element={<DocumentDetails/>} />
                <Route path="/document/new" element={<DocumentForm />} />
            </Routes>
        </Router>
    );
}

export default App;