"use client";

import { FaArrowRight, FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa"; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';


const AdminPanel = () => {
  const router = useRouter();
const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  const [formData, setFormData] = useState({
     AdminID: "",
     Adminpassword: "",
 
   });

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
  
    // Validate form fields
    if (!formData.AdminID || !formData.Adminpassword) {
      setError("Please fill all required fields.");
      setIsLoading(false);
      return;
    }
  
    try {
      const data = new FormData();
      // Append form data
      data.append("AdminID", formData.AdminID);
      data.append("Adminpassword", formData.Adminpassword);
  
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      console.log("API Key from client:", API_KEY); // Log to verify the API key
  
      const response = await toast.promise(
        axios.post('http://localhost:3000/api/admin', data, {
          headers: {
            Authorization: `${API_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
        }),
        {
          loading: 'Loading...',
          success: <b>Login Success! Redirecting</b>,
          error: <b>Error</b>,
        }
      );
  
      setFormData({
        AdminID: "",
        Adminpassword: "",
      });
  
      if (response.status === 200) { // Check if the response status is 200 (OK)
  
        // Redirect to the dashboard
        router.push("/Admin/AdminDashBoard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
  
      setError(""); 
      setIsLoading(false);
  
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "Error during login. Please try again.");
      setIsLoading(false);
    }
  };
  

  return (
    <>
   
        <div className="flex gap-3 h-[100vh] w-full justify-center items-center flex-col overflow-y-scroll bg-[#141414] py-9 pr-8 pl-5">
               <div className="p-10 h-[70%] rounded-xl bg-[#1b1b1b] flex justify-center items-center shadow-lg w-[60%]">
                 <form onSubmit={handleSubmit} className="space-y-7 py-2 bg-[#1b1b1b] flex justify-center items-center w-[90%]">
                            <div className=" flex items-start">
                              <h3 className="text-3xl font-bold mb-6 text-white">Admin Login</h3>
                            </div>
                            <div className="flex w-[70%] flex-col gap-6 ">
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  name="AdminID"
                                  placeholder="AdminID"
                                  value={formData.AdminID}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <input
                                  type="password"
                                  name="Adminpassword"
                                  placeholder="Password"
                                  value={formData.Adminpassword}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                                  required
                                />
                              </div>
                            </div>

                            <div className=" ">
                              <button
                                type="submit"
                                className="mt-6 px-6 py-3 bg-black text-white rounded-full text-lg flex items-center gap-2 hover:bg-gray-800"
                              >
                                Submit <FaArrowRight />
                              </button>
                            </div>
                          </form>
                          
                        </div>
        </div>
      
    </>
  );
};

export default AdminPanel;
