import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clickonmanu } from "../../store/smallReduser";
function Nav() {
    const dispatch = useDispatch();
    const active = useSelector((state) => state.tools.manue);
    const islogin = useSelector((state) => state.tools.LOGINDED);

    const handleToggleMenu = () => {
        dispatch(clickonmanu(!active));
    };

    return (
        <>
            <div className='fixed w-full px-5 h-[60px] flex items-center z-50 justify-between text-highlight boxShadwo'>
                <Link to={"/"} className='text-2xl font-mainfont font-bold'>
                    CloudData.NET
                </Link>
                {!islogin ? (
                    <Link
                        to={"/register"}
                        className='text-2xl font-mainfont font-bold'
                    >
                        <button>Register</button>
                    </Link>
                ) : (
                    <div>
                        <i
                            className={`fa-solid p-1 ${
                                active ? "fa-xmark" : "fa-bars"
                            } text-end pr-3 pt-3 cursor-pointer`}
                            onClick={handleToggleMenu}
                        >m</i>
                    </div>
                )}
            </div>
            <div className='h-[58px]'>asif</div>
        </>
    );
}

export default Nav;
