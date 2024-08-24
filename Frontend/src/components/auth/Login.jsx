import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../../utils/js/api.request";
import { useDispatch } from "react-redux";
import { changisUserLogin } from "../../store/smallReduser";
function Login() {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const response = await makeRequest("POST", "/request/login", {
            username: data.username,
            password: data.password,
        });
        if (response.status == 200) {
            navigate("/dashboard");
            localStorage.setItem("Acessestoken", response.data.Acessestoken);
            dispatch(changisUserLogin(true));
        }
     console.log(response);   
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
                <h2 className='text-3xl font-bold text-center pb-4 text-link font-normalFont'>
                    LOGIN
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col items-center'
                >
                    <div className='inputDiv'>
                        <p className='inputLabel'>username</p>
                        <input
                            type='username'
                            {...register("username", { required: true })}
                            className='inputFilds'
                        />
                    </div>

                    <div className='inputDiv'>
                        <p className='inputLabel'>Password</p>
                        <input
                            type='password'
                            {...register("password", { required: true })}
                            className=' inputFilds'
                        />
                    </div>

                    <button
                        type='submit'
                        className=' ButtonClick px-3 py-1 rounded-lg mt-6'
                    >
                        LOGIN
                    </button>
                </form>
                <div className='mt-6 text-center'>
                    <Link to='/register' className='text-link hover:underline'>
                        Don't have an account?
                        <span className='text-highlight'>Register</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
