import React, { useRef, useState } from "react";

function Dashboard() {
    let asif = (text = "UCD!_") => {
        return (
            text +
            Date()
                .toLocaleUpperCase()
                .substring(8, 24)
                .replace(":", "_")
                .replace(":", "_")
                .replace(" ", "_")
                .replace(" ", "_") +
            "_" +
            Math.floor(Math.random() * 1e9 ** 1)
        );
    };
    const [valueinputbox, setvalueinputbox] = useState("text");
    const inputvalue = useRef();
    const thisvalue = useRef();
    const grtvalue = () => {
        setvalueinputbox(inputvalue.current.value);
    };
    return (
        <div className="flex flex-col w-screen h-screen p-24 items-center justify-center">
            <p>Dasbord</p>
            <form action="" method="post" className="flex flex-col gap-3 w-3/4">
                <input
                    type="text"
                    className="rounded-md focus:outline-none px-2 py-1"
                />
                <input
                    type={valueinputbox}
                    className={
                        valueinputbox === "file"
                            ? "bg-slate-200 outline-none focus:outline-none placeholder:bg-slate-200 asifcss"
                            : "rounded-md focus:outline-none px-2 py-1"
                    }
                    placeholder={`Enter Your ${valueinputbox}`}
                    ref={thisvalue}
                    
                />
                <select
                    name="dd"
                    ref={inputvalue}
                    onChange={grtvalue}
                    className="p-2 rounded-md cursor-pointer"
                >
                    <option value="text">Text</option>
                    <option value="password">Password</option>
                    <option value="file">File</option>
                </select>
            </form>
            {asif()}
        </div>
    );
}

export default Dashboard;