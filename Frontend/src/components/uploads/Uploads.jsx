import React, { useState } from "react";
import FileUpload from "../uploads/FileUpload";
import TextUpload from "./TextUpload";
function Uploads() {
    const [value, setValue] = useState(""); // Initialize with an empty string

    const handleChange = (e) => {
        setValue(e.target.value);
        console.log("Selected value:", e.target.value); // Log selected value
    };

    return (
        <>
            <div className='w-screen h-96 relative'>
                <div className='flex flex-col gap-2 w-screen items-center relative top-8 h-32'>
                    <select
                        name='options'
                        className='w-1/4 p-2 rounded-lg font-bold  bg-cyan-100 shadow-lg shadow-zinc-500 text-blue-500'
                        onChange={handleChange}
                    >
                        <option value='file'>File</option>
                        <option value='text'>Text</option>
                    </select>
                </div>
                <div className=' flex items-center h-[60vh] justify-center'>
                    {value === "text" ? <TextUpload /> : <FileUpload />}
                </div>
            </div>
        </>
    );
}

export default Uploads;
