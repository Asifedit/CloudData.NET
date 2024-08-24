// NavDasnord Component (NavDasnord.js)
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changisUserLogin,clickonmanu } from "../../store/smallReduser";
import makeRequest from "../../utils/js/api.request";
import { useEffect } from "react";
function NavDasnord() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const manuclick = useSelector((state) => state.tools.manue);
    const logout = async () => {
        const response = await makeRequest("POST", "/request/logout");
            localStorage.clear()
            console.log(localStorage.getItem("Acessestoken"));
        dispatch(changisUserLogin(false));
        dispatch(clickonmanu(false))
            navigate("/login");
        console.log(response);
    };
    useEffect(() => {
        dispatch(clickonmanu(false))
    },[])
    return (
        <div className={`NAVbarActive ${manuclick ? "active" : "notactiv"} `}>
            <Link
                to={"/dashboard"}
                onClick={() => dispatch(clickonmanu(false))}
                className='eliment'
            >
                Dashboard
            </Link>
            <Link
                to={"/upload"}
                onClick={() => dispatch(clickonmanu(false))}
                className='eliment'
            >
                Upload
            </Link>
            <Link
                to={"/support"}
                className='eliment'
                onClick={() => dispatch(clickonmanu(false))}
            >
                Support
            </Link>
            <Link
                className='text-red-700 eliment text-red'
                onClick={logout}
            >
                Logout
            </Link>
        </div>
    );
}
export default NavDasnord;
