'use client';

import { useState } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';


const EditBox = ({ isOpen, onClose, StudentIndex, eventData, onSave }) => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        eventName: "",
        eventDescription: "",
        collegeName: "",
        organization: "",
        eventNotice: "",
        eventDate: "",
        category: "",
        time: "",
        department: [],
        eligible_degree_year: [],
        isMoney: false,
        money: "",
        image: null,
        certificate: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((item) => item !== value),
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, [name]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formDataToSubmit.append(`${key}[${index}]`, item);
                });
            } else {
                formDataToSubmit.append(key, value);
            }
        });

        try {
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
            const response = await axios.put(
                `http://localhost:3000/api/studentevent?_id=${StudentIndex}`,
                formDataToSubmit,
                {
                    headers: {
                        Authorization: `${API_KEY}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Data Successfully Updated")
                onSave(formData);
                onClose();
            } else {
                setError("Failed to save data. Please try again.");
            }
        } catch (err) {
            toast.error("Error Updating Data ")
            console.error("Error during form submission:", err);
            setError("An error occurred while saving data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <div className="bg-white backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-8 w-[90%] md:w-[80%] lg:w-[90%]">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Edit Event</h2>

                        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                {Object.entries(formData).map(([key, value]) => {
                                    if (key === "image" || key === "certificate") {
                                        return (
                                            <div key={key} className="flex flex-col">
                                                <label className="text-gray-700 font-medium mb-2 capitalize">{key}:</label>
                                                <input
                                                    type="file"
                                                    name={key}
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        );
                                    } else if (key === "isMoney") {
                                        return (
                                            <div key={key} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name={key}
                                                    checked={value}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                <label className="text-gray-700 font-medium capitalize">{key}</label>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={key} className="flex flex-col">
                                                <label className="text-gray-700 font-medium mb-2 capitalize">{key}:</label>
                                                <input
                                                    type={
                                                        key === "eventDate" || key === "date"
                                                            ? "date"
                                                            : key === "time"
                                                            ? "time"
                                                            : "text"
                                                    }
                                                    name={key}
                                                    value={value}
                                                    onChange={handleChange}
                                                    className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>

                            <div className="flex justify-between w-full mt-8 space-x-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-6 rounded-lg hover:from-red-600 hover:to-red-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        "Save"
                                    )}
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
