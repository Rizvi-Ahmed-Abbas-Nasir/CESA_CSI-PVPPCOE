"use client";

import React, { useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa"; // Import the FaSearch icon
import { useSession } from "next-auth/react";
import NAV from "../../Navbar";

const CompatibilityForm = () => {
  const { data: session } = useSession();
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issueType: "",
    description: "",
    websiteLink: "",
    screenshot: null,
  });

  const handleIssueSelection = (issue) => {
    setSelectedIssues((prevSelected) =>
      prevSelected.includes(issue)
        ? prevSelected.filter((item) => item !== issue)
        : [...prevSelected, issue]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log("Selected Issues:", selectedIssues);
  };

  return (
    <div className="flex w-full h-[100vh] xl:flex-row flex-col">
      <NAV />
      <div className="flex gap-3 h-full w-full flex-col  bg-[#141414] py-9 px-4">
        <div className="w-full justify-start items-start mb-4">
          {/* Search input with icon */}
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={formData.name}
              onChange={handleInputChange}
              className="w-[30%] px-4 py-3 pl-10 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
              required
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
        </div>
        <div className=" p-10 rounded-lg flex items-center flex-col bg-[#1b1b1b] shadow-lg w-full">
         
        
          <form onSubmit={handleSubmit} className="space-y-7 py-2 bg-[#1b1b1b] w-[90%]">
          <div className="w-[100%] flex items-start">
          <h3 className="text-3xl font-bold mb-6 text-white">Product Application</h3>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[100%]">
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[100%]">
              <div className="space-y-2">
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                  required
                >
                  <option value="" className="text-white">Select Issue Type</option>
                  <option value="ui_layout">UI/UX - Layout & Responsiveness</option>
                  <option value="ui_interactivity">UI/UX - Interactivity & Animations</option>
                  <option value="ui_text_errors">UI/UX - Text & Content Errors</option>
                  <option value="func_navigation">Functional - Navigation & Links</option>
                  <option value="perf_loading_speed">Performance - Loading Speed</option>
                </select>
              </div>
            </div>

            <textarea
              name="description"
              placeholder="Describe the issue"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white h-24"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[100%]">
              <input
                type="text"
                name="websiteLink"
                placeholder="Website Link"
                value={formData.websiteLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
              />
              <input
                type="file"
                name="screenshot"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, screenshot: e.target.files[0] })}
                className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                "Layout & Responsiveness",
                "Interactivity & Animations",
                "Performance Optimization",
                "Security Patches",
                "Mobile Optimization",
              ].map((issue, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`px-6 py-2 rounded-full border ${
                    selectedIssues.includes(issue)
                      ? "bg-gray-800 text-white"
                      : "text-white border-white bg-[#202020] hover:bg-[#1f1e1e] hover:text-white"
                  }`}
                  onClick={() => handleIssueSelection(issue)}
                >
                  + {issue}
                </button>
              ))}
            </div>

            <div className="w-full justify-start">
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
    </div>
  );
};

export default CompatibilityForm;
