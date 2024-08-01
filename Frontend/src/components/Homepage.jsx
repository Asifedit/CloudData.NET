import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
                <Link to="/register" className="text-blue-500 hover:underline">
                    Register
                </Link>{" "}
                |
                <Link to="/login" className="text-blue-500 hover:underline">
                    {" "}
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Homepage;
