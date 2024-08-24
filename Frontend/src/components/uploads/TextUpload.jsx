import React, { useState } from "react";
import toast from "react-hot-toast";
import makeRequest from "../../utils/js/api.request";
import { useNavigate } from "react-router-dom";
const TextEditor = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const Navigate = useNavigate();
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleTextChange = (e) => {
        const newText = e.target.value;
        const lineCount = newText.split("\n").length;
        if (lineCount <= 20 && text.length <= 200) {
            setText(newText);
            setError("");
        } else if (lineCount > 20) {
            setError("Line limit exceeded (20 lines)");
        } else {
            setError("Text limit exceeded (100 characters)");
        }
    };
    const handleSubmit = async () => {
        if (!title || !text) {
            toast.error("fill all poperly");
            return;
        }
        if (text.length <= 200 && text.split("\n").length <= 20) {
            setError("");
        } else if (text.length > 200) {
            setError("Text limit exceeded (1000 characters)");
        } else if (text.split("\n").length > 20) {
            setError("Line limit exceeded (20 lines)");
        }
        const resposce = await makeRequest("POST", "/request/data/add/text", {
            title,
            content: text,
        });
        if (resposce.status === 200) {
            fetchData();
            Navigate("/dashboard");
        }
    };

    return (
        <div className='p-4 w-96 h-[60vh] font-semibold'>
            <div className='mb-2'>
                <p className='InputBoxTitle'>Topic</p>
                <input
                    type='text'
                    value={title}
                    onChange={handleTitleChange}
                    placeholder=' CloudData.NET ...'
                    className='w-full p-2 InputBox'
                />
            </div>
            <p className='InputBoxTitle mt-4'>Content</p>
            <textarea
                value={text}
                onChange={handleTextChange}
                className={`w-full InputBox  overflow-auto ${
                    error ? "border_red_500" : "border-gray-300"
                }`}
                placeholder='Asif124#11asif ...'
                maxLength={200}
                rows={10}
            />
            <div className='flex justify-between text-sm mt-2'>
                <span>Maxmum Text : {200 - text.length}</span>
                {error && <p className='text-red-500 text-rose-600'>{error}</p>}
            </div>
            <div className='flex  justify-center mt-6'>
                <button
                    onClick={handleSubmit}
                    className='ButtonClick  scale-x-75 scale-y-75 text-center'
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default TextEditor;
