import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import makeRequest from "../../utils/js/api.request";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changisUserLogin } from "../../store/smallReduser";
function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [deseableva, setdeseableva] = useState(false);
    const onSubmit = async (data) => {
        setdeseableva(true);
        const response = await makeRequest("POST", "/request/resistor", {
            username: data.username,
            email: data.email,
            password: data.password,
        });
        
        if (response.status == 200) {
            navigate("/dashboard");
            localStorage.setItem("Acessestoken", response.data.Acessestoken);
            dispatch(changisUserLogin(true));
        }
        if (response) {
            setdeseableva(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 flex-col'>
            <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
                <h2 className='text-4xl font-bold text-center pb-4 text-link font-normalFont'>
                    Register
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col items-center justify-center'
                >
                    <div className='inputDiv'>
                        <p className='inputLabel '>Username</p>
                        <input
                            type='text'
                            {...register("username", { required: true })}
                            className='inputFilds'
                        />
                    </div>
                    <div className='inputDiv'>
                        <p className='inputLabel'>Email</p>
                        <input
                            type='email'
                            {...register("email", { required: true })}
                            className='inputFilds'
                        />
                    </div>
                    <div className='inputDiv'>
                        <label className='inputLabel'>Password </label>
                        <input
                            type='password'
                            {...register("password", { required: true })}
                            className='inputFilds'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={deseableva}
                        className='ButtonClick px-3 py-1 rounded-lg mt-6 w-32'
                    >
                        Register
                    </button>
                </form>
                <div className='mt-4 text-center'>
                    <Link to='/login' className='text-blue-500 hover:underline'>
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
