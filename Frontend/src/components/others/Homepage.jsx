import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changisUserLogin } from "../../store/smallReduser";
import { animateHomePage } from "../../utils/js/gsap";

function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
        dispatch(changisUserLogin(false));
        animateHomePage();
    });
    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900 '>
            {/* Header Section */}
            <div className=' bg-gradient-to-r from-blue-500 to-cyan-500 py-16 md:py-24 text-center text-white shadow-lg'>
                <div className='header-content container mx-auto '>
                    <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg text-slate-200'>
                        Welcome to&nbsp;
                        <span className='text-slate-50 drop-shadow-2xl'>
                            CloudData.NET
                        </span>
                    </h1>
                    <p className='text-xl md:text-2xl mt-4'>
                        Your Secure Cloud Storage Solution
                    </p>
                    <button
                        className='mt-8 bg-white text-blue-500 hover:bg-blue-100 font-bold py-3 px-6 md:py-4 md:px-8 rounded-full shadow-xl transition duration-300'
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                </div>
            </div>
            {/* Features Section */}
            <section className='py-16 md:py-20 bg-white shadow-sm '>
                <div className='container mx-auto'>
                    <h2 className='text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8 md:mb-12 header-title-content'>
                        Why Choose CloudData.NET?
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {[
                            {
                                title: "Fast Uploads",
                                icon: "fas fa-cloud-upload-alt",
                                description:
                                    "Upload your files quickly and efficiently with our optimized servers.",
                            },
                            {
                                title: "Secure Storage",
                                icon: "fas fa-lock",
                                description:
                                    "Your data is encrypted and stored securely, ensuring maximum privacy.",
                            },
                            {
                                title: "Anywhere Access",
                                icon: "fas fa-mobile-alt",
                                description:
                                    "Access your files from any device, wherever you are.",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className='feature bg-gray-50 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center'
                            >
                                <i
                                    className={`${feature.icon} text-blue-500 text-5xl md:text-6xl mb-4`}
                                ></i>
                                <h3 className='text-xl md:text-2xl font-semibold text-blue-600 mb-4'>
                                    {feature.title}
                                </h3>
                                <p className='text-gray-600'>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Main Content Sections */}
            <section className='py-12 md:py-16 bg-gray-50'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {[
                            {
                                title: "Upload Files",
                                description:
                                    "Easily upload and store your photos, music, videos, and documents. Access them from anywhere, at any time.",
                                features: [
                                    "Securely store your important files",
                                    "Access files from any device",
                                    "Fast and reliable cloud storage",
                                ],
                            },
                            {
                                title: "Store Text",
                                description:
                                    "Save your notes, documents, and other text data securely. Access them anytime, anywhere, with our easy-to-use interface.",
                                features: [
                                    "Organize your notes efficiently",
                                    "Fast search and retrieval of saved text",
                                    "Encrypted storage for maximum privacy",
                                ],
                            },
                            {
                                title: "Access Anywhere",
                                description:
                                    "No matter where you are, access your files seamlessly on any device. CloudData.NET ensures your data is always within reach.",
                                features: [
                                    "Cross-platform access",
                                    "Seamless synchronization",
                                    "Real-time file updates",
                                ],
                            },
                        ].map((section, index) => (
                            <div
                                key={index}
                                className='bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'
                            >
                                <h2 className='text-2xl md:text-3xl font-bold text-blue-600 mb-4 section-title'>
                                    {section.title}
                                </h2>
                                <p className='text-gray-700 mb-4 section-content '>
                                    {section.description}
                                </p>
                                <ul className='list-disc list-inside text-gray-600 space-y-2 section-content'>
                                    {section.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Footer Section */}
            <footer className='py-12 md:py-16 bg-blue-600 text-white text-center'>
                <div className='container mx-auto footer-content'>
                    <h2 className='text-3xl md:text-4xl font-bold'>
                        Ready to Get Started?
                    </h2>
                    <p className='text-lg mt-4'>
                        Join CloudData.NET today and start securing your files
                        in the cloud.
                    </p>
                    <div className=' my-5 flex'>
                        <div className='w-1/2'>
                            <p className='text-lg'>Contacet</p>
                            <i className='fa-solid'></i>
                            <i className='fa-solid'></i>
                            <i className='fa-solid'></i>
                        </div>
                        <div className='w-1/2'>
                            <p className='text-lg'>Find Me</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default HomePage;
