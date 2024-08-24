import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../components/others/Homepage";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Dashboard from "../components/view/Dasbord";
import SupportPage from "../components/others/SupportPage";
import Uploads from "../components/uploads/Uploads";
import "../utils/css/dashboard.css"

function route() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/upload' element={<Uploads />} />
                <Route path='/support' element={<SupportPage />} />
            </Routes>
        </>
    );
}
export default route;
