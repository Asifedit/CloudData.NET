import React, { useState } from "react";

function SupportPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to the server)
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900'>
            {/* Header Section */}
            <header className='bg-gradient-to-r from-blue-500 to-cyan-500 py-20 md:py-32 text-center text-white shadow-lg'>
                <div className='container mx-auto header-content'>
                    <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg'>
                        Support Center
                    </h1>
                    <p className='text-xl md:text-2xl mt-4 drop-shadow-md'>
                        How can we help you today?
                    </p>
                </div>
            </header>
            {/* FAQ Section */}
            <section className='py-16 md:py-20 bg-white shadow-sm'>
                <div className='container mx-auto'>
                    <h2 className='text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8 md:mb-12 section-title'>
                        Frequently Asked Questions
                    </h2>
                    <div className='space-y-8'>
                        {[
                            {
                                question: "Is my data secure?",
                                answer: "Yes, all your data is encrypted and stored securely in our cloud storage system, ensuring maximum privacy and protection.",
                            },
                            {
                                question:
                                    "Can I access my data from any device?",
                                answer: "Absolutely! CloudData.NET allows you to access your data from any device, no matter where you are , but after login .",
                            },
                            {
                                question:
                                    "How do I upload files to CloudData.NET?",
                                answer: "Simply log in to your account, navigate to the upload section, and select the files you want to store in the cloud.",
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className='bg-gray-50 p-6 md:p-8 rounded-lg shadow-lg'
                            >
                                <h3 className='text-xl md:text-2xl font-semibold text-blue-600 mb-4'>
                                    {faq.question}
                                </h3>
                                <p className='text-gray-600'>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Support Form */}
            <section className='py-16 md:py-20 bg-white shadow-sm'>
                <div className='container mx-auto'>
                    <h2 className='text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8 md:mb-12 section-title'>
                        Need Further Assistance?
                    </h2>
                    <form
                        className='bg-gray-50 p-6 md:p-8 rounded-lg shadow-lg max-w-3xl mx-auto'
                        onSubmit={handleSubmit}
                    >
                        <div className='mb-6'>
                            <label
                                htmlFor='name'
                                className='block text-lg font-semibold text-gray-700'
                            >
                                Your Name
                            </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 transition duration-200'
                            />
                        </div>

                        <div className='mb-6'>
                            <label
                                htmlFor='email'
                                className='block text-lg font-semibold text-gray-700'
                            >
                                Your Email
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 transition duration-200'
                            />
                        </div>

                        <div className='mb-6'>
                            <label
                                htmlFor='message'
                                className='block text-lg font-semibold text-gray-700'
                            >
                                Your Message
                            </label>
                            <textarea
                                id='message'
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows='5'
                                className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 transition duration-200'
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-xl transition duration-300'
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer Section */}
            <footer className='py-12 md:py-16 bg-blue-600 text-white text-center shadow-lg'>
                <div className='container mx-auto footer-content'>
                    <h2 className='text-3xl md:text-4xl font-bold'>
                        We’re Here to Help
                    </h2>
                    <p className='text-lg mt-4'>
                        Contact us anytime for support and assistance with
                        CloudData.NET.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default SupportPage;
