import axios from "axios";
import toast from "react-hot-toast";

const makeRequest = async (method, url, data, options = {}) => {
    const toastId = toast.loading("Processing your request...");

    try {
        // Validate method
        if (!["GET", "POST", "PUT", "DELETE"].includes(method)) {
            throw new Error("Invalid HTTP method");
        }
        const reqOptions = {
            url: `http://localhost:5000/api${url}`,
            method: method,
            data: data,
            headers: {
                ...options.headers,
            },
            withCredentials: true,
        };
        // Only set Content-Type for non-FormData requests
        if (!(data instanceof FormData)) {
            reqOptions.headers["Content-Type"] = "application/json";
            reqOptions.data = JSON.stringify(data);
        }
        const response = await axios.request(reqOptions);
        toast.success(response.data.message || "Request successful!");
        return response;
    } catch (error) {
        console.log("Error details:", error);
        toast.error(error.response.data.message);
        return
    } finally {
        toast.dismiss(toastId);
    }
};

export default makeRequest;