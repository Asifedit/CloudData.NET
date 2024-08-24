import React, { useEffect, useState } from "react";
import makeRequest from "../../utils/js/api.request";
import { useDispatch, useSelector } from "react-redux";
import { addDataonStore } from "../../store/smallReduser";
import toast from "react-hot-toast";

const Dashboard = () => {
    const dispatch = useDispatch();
    const [filterType, setFilterType] = useState("All"); // State for select option
    const [inputValue, setInputValue] = useState(""); // State for input value
    const [updateddata, setupdateddata] = useState(false); // State for input value
    const [ItemId, setItemId] = useState(null);
    const [inputvlue, setinputvlue] = useState("");
    const [inputcontain, setinputcontain] = useState("");
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };
    const getMediaType = (url) => {
        const extension = url.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png", "gif"].includes(extension)) return "image";
        if (["mp4", "webm", "ogg"].includes(extension)) return "video";
        if (extension === "pdf") return "pdf";
        if (extension) return "text";
        return "others";
    };
    const storeData = useSelector((state) => state.tools.userDATA).filter(
        (e) => {
            const dataType = getMediaType(e.Datavalue);
            const fileData = e.Datatopic.toLowerCase();
            const filterText = inputValue.toLowerCase();
            const matchesInput = fileData.includes(filterText);
            const matchesFilterType =
                filterType === "All" || dataType === filterType;
            return matchesInput && matchesFilterType;
        }
    );
    const isValidUrl = (text) => {
        try {
            new URL(text);
            return true;
        } catch (_) {
            return false;
        }
    };
    const fetchData = async () => {
        try {
            const response = await makeRequest("GET", "/request/data/read");
            console.log(response.data);
            dispatch(addDataonStore(response.data));
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };
    useEffect(() => {
        if (!storeData.length == 0) {
            console.log("sosre data is ", storeData.length);
            return;
        }
        fetchData();
    }, [dispatch]);
    useEffect(() => {
    })

    const update = async (item) => {
        setupdateddata(true);
        console.log(item);
        setItemId(item);
    };
    const inputDataValue = (e) => {
        setinputvlue(e.target.value);
    };
    const inputDataContain = (e) => {
        setinputcontain(e.target.value);
    };
    const updatevalueandsubmit = async () => {
        if (!inputvlue || !inputcontain) {
            toast.error("input value is requare");
            return;
        }
        const response = await makeRequest(
            "POST",
            `/request/data/update/${ItemId}`,
            {
                Datatopic: inputvlue,
                Datavalue: inputcontain,
            }
        );
        if (response.status === 200) {
            fetchData();
            setupdateddata(false);
        }
        setinputvlue(null);
        setinputcontain(null);
    };
    const deleat = async (item) => {
        console.log(item);
        const response = await makeRequest(
            "DELETE",
            `/request/data/deleate/${item}`
        );
        fetchData();
        console.log(response.data);
    };
    const copy = () => {
        console.log("hi");
    };
    return (
        <>
            <div className='p-4 overflow-auto max-h-screen'>
                <div className='flex items-center gap-11 justify-center py-6'>
                    <input
                        type='text'
                        className='p-2 w-80 h-10 rounded-md  shadow-lg shadow-zinc-400 focus:outline-none'
                        placeholder='Search...'
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <select
                        name='options'
                        className='w-28 p-2 rounded-lg bg-cyan-100 shadow-lg shadow-zinc-500 text-blue-500'
                        value={filterType}
                        onChange={handleFilterChange}
                    >
                        <option value='All'>All</option>
                        <option value='text'>Text</option>
                        <option value='image'>Image</option>
                        <option value='video'>Video</option>
                        <option value='pdf'>PDF</option>
                        <option value='others'>Others</option>
                    </select>
                </div>
                <div className='card-container'>
                    {storeData.length > 0 ? (
                        storeData.map((item) => (
                            <div key={item._id} className='card '>
                                <h2 className='card-title'>
                                    {item.Datatopic}
                                </h2>
                                <div className='card-content'>
                                    {isValidUrl(item.Datavalue) ? (
                                        (() => {
                                            const mediaType = getMediaType(
                                                item.Datavalue
                                            );
                                            switch (mediaType) {
                                                case "image":
                                                    return (
                                                        <img
                                                            src={item.Datavalue}
                                                            alt={item.Datatopic}
                                                            className='card-image'
                                                            onError={(e) => {
                                                                e.target.style.display =
                                                                    "none";
                                                            }}
                                                        />
                                                    );
                                                case "video":
                                                    return (
                                                        <video
                                                            src={item.Datavalue}
                                                            controls
                                                            className='card-video'
                                                        />
                                                    );
                                                case "pdf":
                                                    return (
                                                        <div className='card-pdf'>
                                                            <i className='fas fa-file-pdf fa-3x text-red-500'></i>
                                                            <p className='card-pdf-text'>
                                                                PDF Document
                                                            </p>
                                                        </div>
                                                    );
                                                default:
                                                    return (
                                                        <p className='card-text'>
                                                            {item.Datavalue}
                                                        </p>
                                                    );
                                            }
                                        })()
                                    ) : (
                                        <p className='card-text'>
                                            {item.Datavalue}
                                        </p>
                                    )}
                                </div>
                                <div className='flex items-center gap-2 justify-around'>
                                    <i
                                        className='cursor-pointer'
                                        onClick={() => deleat(item._id)}
                                    >
                                        d
                                    </i>
                                    <i
                                        className='cursor-pointer'
                                        onClick={copy}
                                    >
                                        c
                                    </i>
                                    <i
                                        className='cursor-pointer'
                                        onClick={() => update(item._id)}
                                    >
                                        u
                                    </i>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='no-data text-center text-gray-500'>
                            No data available.
                        </p>
                    )}
                </div>
            </div>
            <div
                className={`updateData  rounded-3xl ${
                    updateddata ? "" : " h-0 w-0 opacity-0"
                } `}
            >
                {updateddata ? (
                    <div>
                        <p
                            className=' absolute top-4 right-7 cursor-pointer text-end'
                            onClick={() => setupdateddata(false)}
                        >
                            x
                        </p>
                        <div className='flex flex-col  items-center justify-center gap-2'>
                            <div className='inputDiv'>
                                <p className='inputLabel'>TITLE</p>
                                <input
                                    type='text'
                                    className='inputFilds'
                                    placeholder='EX. CloudData.NET'
                                    onChange={inputDataValue}
                                />
                            </div>
                            <div className='inputDiv'>
                                <p className='inputLabel'>DATA</p>
                                <input
                                    type='text'
                                    className='inputFilds'
                                    placeholder='EX. Thid is Example Data'
                                    onChange={inputDataContain}
                                />
                            </div>
                            <button
                                className={`ButtonClick px-3 py-1 rounded-lg mt-6`}
                                onClick={updatevalueandsubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </>
    );
};
export default Dashboard;
