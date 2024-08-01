import React from "react";
import axios from "axios";

export default function MyForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData)
        try {
            const response = await axios.post(
                "http://localhost:5000/api/requesr/file",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="avatar" />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
