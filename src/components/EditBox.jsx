'use client';

import { useState } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from 'framer-motion';

const EditBox = ({ isOpen, onClose, studentData, onSave }) => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        name: "Rizvi Ahmed Abbas",
        vid: "Vu1s2324006",
        class: "Computer Science",
        batch: "2023-2025",
        div: "A",
        sem: "5",
        hackathons: [],
        competitions: [],
        image: "https://example.com/image.jpg",
        year: ""
    });
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true when form is submitted
        setError("");      // Clear any previous errors

        if (session && session.user) {
            const userID = session.user.id; // Hide userId field
            const data = {
                userId: userID,
                name: formData.name,
                vid: formData.vid,
                class: formData.class,
                batch: formData.batch,
                div: formData.div,
                sem: formData.sem,
                image: formData.image,
            };

            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

            try {
                const response = await axios.put("http://localhost:3000/api/student", data, {
                    headers: {
                        Authorization: `${API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    onSave(formData);
                    onClose();
                } else {
                    setError("Failed to save data. Please try again.");
                }
            } catch (err) {
                console.error("Error during form submission:", err);
                setError("An error occurred while saving data. Please try again.");
            } finally {
                setLoading(false);  // Set loading to false after the request is completed
            }
        } else {
            setError("No valid session found. Please log in.");
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}  // Start from below the screen
                    animate={{ opacity: 1, y: 0 }}   // Slide up to the center
                    exit={{ opacity: 0, y: 50 }}     // Slide down when closing
                    transition={{ duration: 0.4 }}   // Animation duration
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <div className="bg-white backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-8 w-[90%] md:w-[60%] lg:w-[80%]">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Edit Profile</h2>

                        {error && (
                            <div className="text-red-500 mb-4 text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="w-full ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                {Object.entries(formData).map(([key, value]) => (
                                    key !== 'userId' && key !== '_id' && (  // Hide userId and _id fields
                                        <div key={key} className="flex flex-col">
                                            <label className="text-gray-700 font-medium mb-2 capitalize">{key}:</label>
                                            <input
                                                type="text"
                                                name={key}
                                                value={value}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-300 shadow-sm"
                                            />
                                        </div>
                                    )
                                ))}
                            </div>

                            <div className="flex justify-between w-full mt-8 space-x-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 shadow-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 shadow-lg flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                        </svg>
                                    ) : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditBox;
