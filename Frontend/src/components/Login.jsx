import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
console.log(data)
        const response = await axios.post("http://localhost:5000/api/request/login", {
            username: data.username,
            password: data.password,
        });
        console.log(response.data)
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="username"
                            {...register("username", { required: true })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-1/3 mx-auto mt-5 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Don't have an account? Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
