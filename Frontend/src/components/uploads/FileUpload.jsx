import React, { useState, useRef } from "react";
import makeRequest from "../../utils/js/api.request"; // Ensure the path is correct
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function FileUpload() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const Navigate = useNavigate();
    const filenameRef = useRef();
    const fileInputRef = useRef();
    const maxSize = 30 * 1024 * 1024; // 30MB

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Correctly access the file
        if (selectedFile) {
            if (selectedFile.size > maxSize) {
                setError("File size exceeds 30MB.");
                toast.error("File size exceeds 30MB.");
                return;
            }
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("File is required");
            toast.error("File is required.");
            return;
        }

        setIsSubmitting(true);
        const filenamedata = filenameRef.current.value;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filenamedata", filenamedata);

        const response = await makeRequest(
            "POST",
            "/request/data/add/file",
            formData
        );
        if (response.status === 200) {
            Navigate("/dashboard");
        }
    };

    const truncateFileName = (name, maxLength) => {
        if (name.length <= maxLength) {
            return name;
        }
        return name.substring(0, maxLength - 3) + "...";
    };

    return (
        <div className='flex flex-col items-center w-full text-blue'>
            <div>
                <p className='InputBoxTitle'>Topic</p>
                <input
                    className='InputBox w-72 mb-9'
                    type='text'
                    placeholder='Enter Your File Name'
                    ref={filenameRef}
                />
            </div>
            <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-72 h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer relative'
            >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <i className='fa-solid fa-cloud-arrow-up text-9xl text-highlight'></i>
                    <p className='mb-2 text-sm'>
                        <span className='font-semibold overflow-hidden whitespace-nowrap text-link'>
                            {fileName
                                ? truncateFileName(fileName, 40)
                                : "Click to upload"}
                        </span>
                    </p>
                    <p className='text-xs'>
                        {fileName
                            ? file.type
                            : "Photo, Video, Music, Pdf, etc. (MAX. 30MB)"}
                    </p>
                </div>
                <input
                    id='dropzone-file'
                    type='file'
                    className='hidden'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept='.jpg,.jpeg,.png,.gif,.pdf,.txt,.md,.docx,.mp3,.wav,.mp4,.mkv,.mov'
                />
            </label>
            <button
                onClick={handleSubmit}
                className='mt-10 px-4 py-2 ButtonClick'
                disabled={isSubmitting}
            >
                {isSubmitting ? "Uploading.." : "Submit"}
            </button>
        </div>
    );
}

export default FileUpload;
