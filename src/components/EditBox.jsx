import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";


const EditBox = ({ isOpen, onClose, studentData, onSave }) => {
    const { data: session } = useSession();

    const [formData, setFormData] = useState(studentData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit   = async (e) => {
        e.preventDefault();
        const userID = session.user.id;
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

        const response = await axios.put("http://localhost:3000/api/student", data, {
            headers: { 
              Authorization: `${API_KEY}`,
              'Content-Type': 'application/json'
            }
          });
        onSave(formData);
        onClose();
    };
    return (
        isOpen && (
        <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-white/90  bg-opacity-40 backdrop-blur-md"
        >
        <div className="bg-white border rounded-[3rem] shadow-2xl p-6 w-[80%] backdrop-blur-md  border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="mt-4 w-full">
            {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex flex-col mb-4 w-full">
                <label className="text-gray-600 capitalize">{key}:</label>
                <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                />
                </div>
            ))}
            <div className="flex justify-between w-full">
                <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                Cancel
                </button>
                <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                Save
                </button>
            </div>
            </form>
        </div>
</motion.div>

        )
    );
};

export default EditBox;
