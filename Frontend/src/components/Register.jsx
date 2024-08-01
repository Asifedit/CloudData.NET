import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function Register() {

    const { register, handleSubmit } = useForm();
    const [servermsg , setservermsg] = useState("")

    const onSubmit = async (data) => {
       const registrationToast = toast.loading("Registering...");
        try {
            const response = await axios
            .post("http://localhost:5000/api/request/resistor", {
                username: data.username,
                email: data.email,
                password: data.password
            })
            console.log(response.data)
            setservermsg(response.data.message);
           
            toast.success(servermsg);
             
       }
        catch(error) {
           toast.error(error.response?.data?.message || "Registration failed");
        } 
        finally {
                toast.dismiss(registrationToast);
            
      }
    };
  
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Register</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            {...register("username", { required: true })}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
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
                        className="w-1/3 mx-auto my-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;

