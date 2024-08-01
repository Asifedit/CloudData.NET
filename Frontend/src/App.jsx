import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NAVBAR from './components/nav'
import { Toaster } from "react-hot-toast";

function App() {
    
    return (
        <>
            <NAVBAR
                position="top-left"
                reverseOrder={false}
                containerStyle={{
                    top: 55,
                    left: 5,
                }}
            />
            <Toaster />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
