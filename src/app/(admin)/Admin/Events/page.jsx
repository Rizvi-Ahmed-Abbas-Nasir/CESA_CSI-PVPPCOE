"use client";

import React, { useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa"; // Import the FaSearch icon
import NAV from "../../Navbar";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";


const CompatibilityForm = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // data formmater function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];

  };
  //
  const [formData, setFormData] = useState({
    eventTitle: "",
    associateName: "",
    location: "",
    eventType: "",
    description: "",
    aboutEvent: "",
    eventDescription: "",
    websiteLink: "",
    date: "",
    time: "",
    screenshots: [],
  });

  const handleIssueSelection = (issue) => {
    setSelectedCategories((prevSelected) =>
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

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        screenshots: [...(prevData.screenshots || []), ...Array.from(files)],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors
    console.log("Form Data:", formData);
    console.log("Selected Categories:", selectedCategories);
  
    // Validate required form fields
    const requiredFields = [
      "eventTitle",
      "associateName",
      "location",
      "eventType",
      "date",
      "time",
      "description",
      "aboutEvent",
      "eventDescription",
      "websiteLink",
    ];
  
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      setError("Please fill all required fields.");
      setIsLoading(false);
      return;
    }
  
    // Validate event type
    const validCategories = ["Competition", "Hackathon", "Seminar", "Webinar", "Workshop"];
    if (!validCategories.includes(formData.eventType)) {
      setError("Invalid event type. Please select a valid category.");
      setIsLoading(false);
      return;
    }
  
    try {
      const formattedDate = formData.date; // Ensure date is in the expected format
      const data = new FormData();
  
      // Explicitly append all form fields
      data.append("eventTitle", formData.eventTitle);
      data.append("associateName", formData.associateName);
      data.append("location", formData.location);
      data.append("eventType", formData.eventType);
      data.append("date", formattedDate);
      data.append("time", formData.time);
      data.append("description", formData.description);
      data.append("aboutEvent", formData.aboutEvent);
      data.append("eventDescription", formData.eventDescription);
      data.append("websiteLink", formData.websiteLink);
  
      // Append screenshots (multiple images)
     if (formData.screenshots && formData.screenshots.length > 0) {
        formData.screenshots.forEach((file) => {
          data.append("screenshots", file);
        });
      }
  
      // Append selected categories as a stringified array
      if (selectedCategories && selectedCategories.length > 0) {
        data.append("selectedCategories", JSON.stringify(selectedCategories)); // Send as stringified array
      }
  
  
      // API Key (Ensure this is set in your environment)
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      console.log("API Key:", API_KEY);
  
      // Send data to the server using Axios
      await toast.promise(
        axios.post("http://localhost:3000/api/events", data, {
          headers: {
            Authorization: `${API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Saving...",
          success: <b>Event created successfully!</b>,
          error: <b>Could not save event. Please try again.</b>,
        }
      );
  
      // Reset form data after successful submission
      setFormData({
        eventTitle: "",
        associateName: "",
        location: "",
        eventType: "",
        date: "",
        time: "",
        description: "",
        aboutEvent: "",
        eventDescription: "",
        websiteLink: "",
        screenshots: [],
      });
  
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting event:", error);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setIsLoading(false);
    }
  };
  
  
  

  return (
    <div className="flex w-full h-[100vh] xl:flex-row flex-col">
      <NAV />
      <div className="flex gap-3 h-[100vh] w-full flex-col bg-[#141414] py-9 pr-8 pl-4 overflow-y-auto max-h-[100vh]">
        <div className="w-full justify-start items-start mb-4">
          {/* Search input with icon */}
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search"
              onChange={handleInputChange}
              className="w-[30%] px-4 py-3 pl-10 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
              required
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
        </div>
        <div className="p-10 rounded-lg flex items-center flex-col bg-[#1b1b1b] shadow-lg w-full ">
          {/* Scrollable container for the form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-7 py-2 bg-[#1b1b1b] w-[90%]"
          >
            <div className="w-[100%] flex items-start">
              <h3 className="text-3xl font-bold mb-6 text-white">Add Event</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[100%]">
              <div className="space-y-2">
                <input
                  type="text"
                  name="eventTitle"
                  placeholder="Event Title"
                  value={formData.eventTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  name="associateName"
                  placeholder="Associate Name"
                  value={formData.associateName}
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
                  name="location"
                  placeholder="Event Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                  required
                >
                  <option value="" className="text-white">Select Event Type</option>
                  <option value="Competition">Competition</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[100%]">
              <input
                type="text"
                name="websiteLink"
                placeholder="Website Link"
                value={formData.websiteLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
              />
             <div className="space-y-2">
  <div className="relative w-full">
    <input
      type="file"
      name="screenshot1"
      accept="image/*"
      id="file-upload-1"
      onChange={handleFileChange}
      className="hidden"
    />
    <label
      htmlFor="file-upload-1"
      className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white cursor-pointer flex justify-start items-center"
    >
      Choose 1st Top Image
    </label>
  </div>
</div>

<textarea
  name="description"
  placeholder="Objective of the Event"
  value={formData.description}
  onChange={handleInputChange}
  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white h-24"
  required
/>
<textarea
  name="aboutEvent"
  placeholder="About the Event"
  value={formData.aboutEvent}
  onChange={handleInputChange}
  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white h-24"
  required
/>

            </div>
            <textarea
  name="eventDescription"
  placeholder="Event Description"
  value={formData.eventDescription}
  onChange={handleInputChange}
  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white h-24"
  required
/>

            {/* Date and Time Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[100%]">
              <div className="space-y-2">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                />
              </div>
            </div>

            {/* Additional 6 Image Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
  {Array.from({ length: 6 }).map((_, idx) => (
    <div key={idx} className="space-y-2">
      <div className="relative w-full">
        <input
          type="file"
          name={`screenshot${idx + 2}`}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`file-upload-${idx}`}
        />
        <label
          htmlFor={`file-upload-${idx}`}
          className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white cursor-pointer flex justify-start items-left"
        >
          Choose Images
        </label>
      </div>
    </div>
  ))}
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
                    selectedCategories.includes(issue)
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
