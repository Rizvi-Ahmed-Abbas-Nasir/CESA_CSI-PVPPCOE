import axios from "axios";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSession } from "next-auth/react";
import Alert from "../Components/Alert"
import toast, { Toaster } from 'react-hot-toast';


function CreateEvent() {
  const [message, setMessage] = useState("");
  const [Description, setDescription] = useState("");
  const [type, setType] = useState("");

  const { data: session } = useSession();
    const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    collegename: "",
    organization: "",
    location: "",
    eventNotice: "",
    date: "",
    eventDate: "",
    category: "",
    time: "",
    department: [],
    eligible_degree_year: [],
    ismoney: false,
    money : "",
    image: null,
    certificate: null,
    eventStatus : "",

  
  });

  const [editEventId, setEditEventId] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [bannerPreview, setBannerPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Handle file inputs
    if (type === "file") {
      // Store the uploaded file in the correct field
      if (name === "image") {
        setFormData({
          ...formData,
          image: files[0], // Store image file
        });
      } else if (name === "certificate") {
        setFormData({
          ...formData,
          certificate: files[0], // Store certificate file
        });
      }
    } else if (name === "eligible_degree_year") {
      // Handle eligible years as a checkbox
      const updatedYears = checked
        ? [...formData.eligible_degree_year, value]
        : formData.eligible_degree_year.filter((year) => year !== value);
      setFormData({ ...formData, eligible_degree_year: updatedYears });
    } else if (name === "department") {
      // Handle department as a checkbox
      const updatedDepartments = checked
        ? [...formData.department, value]
        : formData.department.filter((dep) => dep !== value);
      setFormData({ ...formData, department: updatedDepartments });
    } else {
      // Handle other inputs (radio, text, select, etc.)
      setFormData({
        ...formData,
        [name]: type === "radio" ? value === "true" : value,
      });
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const validCategories = ['Hackathon', 'Project Competition', 'Coding Competition']; // List of valid categories
  
    if (
      !formData.eventName ||
      !formData.collegename ||
      !formData.date ||
      !formData.eventDate ||
      !formData.eventStatus
    ) {
      setError("Please fill all required fields.");
      setIsLoading(false);
      return;
    }
  
    // Check if the category is valid
    if (!validCategories.includes(formData.category)) {
      setError("Invalid category. Please select a valid event category.");
      setIsLoading(false);
      return;
    }
  
    if (session && session.user) {
      try {
        const userID = session.user.id;
        const formattedDate = formatDate(formData.date);
        const formattedEventDate = formatDate(formData.eventDate);
        const data = new FormData();
        
        // Append form data
        data.append("userId", userID);
        data.append("eventName", formData.eventName);
        data.append("eventDescription", formData.eventDescription);
        data.append("collegename", formData.collegename);
        data.append("organization", formData.organization);
        data.append("location", formData.location);
        data.append("eventNotice", formData.eventNotice);
        data.append("date", formattedDate);
        data.append("eventDate", formattedEventDate);
        data.append("category", formData.category);
        data.append("time", formData.time);
        data.append("department", formData.department);
        data.append("eligible_degree_year", formData.eligible_degree_year);
        data.append("ismoney", formData.ismoney);
        data.append("money", formData.money);
        data.append("eventStatus", formData.eventStatus);
      
        if (formData.image) {
          data.append("image", formData.image);
        }
        if (formData.certificate) {
          data.append("certificate", formData.certificate);
        }
      
        // Determine if editing or creating an event
        let response;
        if (editEventId) {
          response = await axios.put(`/event/${editEventId}`, data);
          setEditEventId(null);
        } else {
          const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      
          // Make the API request
          response = await axios.post(`https://cesa-csi-pvppcoe.vercel.app/api/studentevent`, data, {
            headers: {
              Authorization: `${API_KEY}`,
              'Content-Type': 'multipart/form-data' // Ensure we are sending form data
            }
          });
        }
      
        // Log the full response to see what it contains
        console.log(response);
      
       
      
        // Reset form data
        setFormData({
          eventName: "",
          eventDescription: "",
          collegename: "",
          organization: "",
          location: "",
          eventNotice: "",
          date: "",
          eventDate: "",
          category: "",
          time: "",
          department: [],
          eligible_degree_year: [],
          ismoney: false,
          money: "",
          image: null,
          certificate: null,
          eventStatus: "",
        });
      
        setError("");
        setIsLoading(false);
         // Check if the response contains a message
        //  setMessage(response.data.message || "Alert!!.");
        //  setDescription(response.data.message || "Your Data is Submitted.");
         toast.success("Your Data is Submitted Successfully")
        //  setType("success")
        // setIsPopupVisible(true)

      } catch (error) {
        toast.error("Error creating event. Please try again.")

        // setMessage(response.data.message || "Alert!!.");
        // setDescription(error.response?.data?.message || "Error creating event. Please try again..");
        // setType("warning")
        console.error("Error:", error); // Log the error for debugging
        // setIsPopupVisible(true)
        setError(error.response?.data?.message || "Error creating event. Please try again.");
        setIsLoading(false);
      }
      
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];

  };

 

  useEffect(() => {
    let timer;
    if (isPopupVisible) {
      timer = setTimeout(() => {
        setIsPopupVisible(false); // Auto-hide after 5 seconds
      }, 5000);
    }
    return () => clearTimeout(timer); // Cleanup timer
  }, [isPopupVisible]);
  
console.log(isPopupVisible)
console.log(message)
console.log(Description)


  return (
    <div className="w-full lg:w-[100%] p-8 border border-gray-300 shadow-md rounded-lg text-black">
          
    {isPopupVisible && (
      <Alert message={message} Description={Description} type={type}  />
    )}
    
  <h2 className="text-2xl mb-6 text-center">EVENT</h2>

  {/* Error Message */}
  {error && <div className="text-red-500 text-center mb-4">{error}</div>}

  {/* Form */}
  <form onSubmit={handleSubmit} className="space-y-6 w-full flex flex-col">
    
    {/* Event Name */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Event Name:</label>
      <input
        type="text"
        name="eventName"
        value={formData.eventName}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
        required
      />
    </div>

    {/* Speaker Name */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">College Name:</label>
      <input
        type="text"
        name="collegename"
        value={formData.collegename}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
        required
      />
    </div>

    {/* Date of Event */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Date of Event:</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
        required
      />
    </div>
    
    {/* Event Deadline */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Event Date:</label>
      <input
        type="datetime-local"
        name="eventDate"
        value={formData.eventDate}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
        required
      />
    </div>

    {/* Event Time */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Event Time:</label>
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      />
    </div>

    {/* Category */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Category:</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      >
        <option value="">Select Category</option>
        <option value="Hackathon">Hackathon</option>
        <option value="Project Competition">Project Competition</option>
        <option value="Coding Competition">Coding Competition</option>
          <option value="Other">Other</option>
      </select>
    </div>

    {/* Degree Year */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Degree Year:</label>
      <div className="flex space-x-4 border border-gray-300 p-4 rounded-lg w-3/4">
        {["2025", "2026", "2027", "2028"].map((year) => (
          <label key={year} className="inline-flex items-center">
            <input
              type="checkbox"
              name="eligible_degree_year"
              value={year}
              checked={formData.eligible_degree_year.includes(year)}
              onChange={handleChange}
              className="mr-2 custom-checkbox rounded-lg"
            />
            {year}
          </label>
        ))}
      </div>
    </div>

    {/* Department */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Department:</label>
      <div className="flex space-x-4 border border-gray-300 p-4 rounded-lg w-3/4">
        {["Comps", "IT", "AIDS"].map((department) => (
          <label key={department} className="inline-flex items-center">
            <input
              type="checkbox"
              name="department"
              value={department}
              checked={formData.department.includes(department)}
              onChange={handleChange}
              className="mr-2 custom-checkbox rounded-lg"
            />
            {department}
          </label>
        ))}
      </div>
    </div>

    {/* Event Description */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Event Description:</label>
      <textarea
        name="eventDescription"
        value={formData.eventDescription}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      />
    </div>

    {/* Speaker Organization */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4"> Organization:</label>
      <input
        type="text"
        name="organization"
        value={formData.organization}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      />
    </div>

    {/* Speaker Location */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4"> Location:</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      />
    </div>

    {/* Notice */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Notice:</label>
      <textarea
        name="eventNotice"
        value={formData.eventNotice}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      />
    </div>

    {/* Banner */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Image:</label>
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      />
    </div>
     {/* Banner */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Certificate Image:</label>
      <input
        type="file"
        name="certificate"
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      />
    </div>

    {/* Is the event Online? */}
    <div className="flex items-center w-full">
          <label className="font-semibold mb-1 w-1/4">Is Event Have Prize Money?</label>
          <div className="flex border border-gray-300 p-4 rounded-lg w-3/4">
            <label className="flex items-center mr-6">
              <input
                type="radio"
                name="ismoney"
                value={true}
                checked={formData.ismoney === true}
                onChange={handleChange}
                className="mr-2 custom-radio-input"
                style={{ width: "24px", height: "24px" }}
              />
              YES
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="ismoney"
                value={false}
                checked={formData.ismoney === false}
                onChange={handleChange}
                className="mr-2 custom-radio-input"
                style={{ width: "24px", height: "24px" }}
              />
              NO
            </label>
          </div>
        </div>

    {formData.money && (
      <div className="flex items-center w-full">
        <label className="font-semibold mb-1 w-1/4">Prize Money:</label>
        <input
          type="text"
          name="eventLink"
          value={formData.money}
          onChange={handleChange}
          className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
        />
      </div>
    )}

  

    {/* Event Status */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Event Status:</label>
      <select
        name="eventStatus"
        value={formData.eventStatus}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      >
        <option value="">Select Status</option>
        <option value="Upcoming">Winner</option>
        <option value="Ongoing">1nd Runner Up </option>
        <option value="Completed">2nd Runner Up</option>
                <option value="Completed">Participate</option>

      </select>
    </div>

    {/* Submit Button */}
    <div className="flex w-full justify-center">
          <button
            type="submit"
            className="w-full lg:w-1/3 mt-5 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          >
            {isLoading ? (
              <ClipLoader color="white" size={20} />
            ) : isLoading ? (
              "Creating Event"
            ) : (
              "Create Event"
            )}
          </button>
        </div>
  </form>
</div>

  
  );
}

export default CreateEvent;
