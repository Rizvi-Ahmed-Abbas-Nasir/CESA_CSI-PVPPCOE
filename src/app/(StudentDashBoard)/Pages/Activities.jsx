import React, { useState } from "react";
// import nodeApi from "../../axiosConfig";
import ClipLoader from "react-spinners/ClipLoader";


function CreateEvent() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    nameOfSpeaker: "",
    organizationOfSpeaker: "",
    locationOfSpeaker: "",
    eventNotice: "",
    date: "",
    eventDeadline: "",
    category: "",
    time: "",
    department: [],
    eligible_degree_year: [],
    isPaid: false,
    isOnline: false,
    eventLink : null,
    cost: null,
    banner: null,
    paymentQR: null,
  });

  const [editEventId, setEditEventId] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [bannerPreview, setBannerPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Handle file inputs for different fields like banner, paymentQR, etc.
    if (type === "file") {
      // Check which file input is being handled based on the `name` attribute
      if (name === "banner") {
        setFormData({
          ...formData,
          banner: files[0],  // Store banner image
        });
      } else if (name === "paymentQR") {
        setFormData({
          ...formData,
          paymentQR: files[0],  // Store payment QR image
        });
      }
    } else if (name === "eligible_degree_year") {
      // Handle eligible years as a checkbox
      const updatedYears = checked
        ? [...formData.eligible_degree_year, value]
        : formData?.eligible_degree_year?.filter((year) => year !== value);
      // console.log(updatedYears);
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
    if (
      !formData.eventName ||
      !formData.nameOfSpeaker ||
      !formData.date ||
      !formData.eventDeadline
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const formattedDate = formatDate(formData.date);
      const formattedDeadlineDate = formatDate(formData.eventDeadline);
      const data = new FormData();
      data.append("eventName", formData.eventName);
      data.append("eventDescription", formData.eventDescription); // New field
      data.append("nameOfSpeaker", formData.nameOfSpeaker);
      data.append("organizationOfSpeaker", formData.organizationOfSpeaker); // New field
      data.append("locationOfSpeaker", formData.locationOfSpeaker); // New field
      data.append("eventNotice", formData.eventNotice); // New field
      data.append("date", formattedDate);
      data.append("eventDeadline", formattedDeadlineDate);
      data.append("category", formData.category);
      data.append("time", formData.time);
      data.append("department", formData.department);
      data.append("eligible_degree_year", formData.eligible_degree_year);
      data.append("isPaid", formData.isPaid);
      data.append("isOnline", formData.isOnline);
      data.append("eventLink", formData.isOnline ? formData.eventLink : null);
      data.append("cost", formData.isPaid ? parseInt(formData.cost, 10) : null);
      if (formData.banner) {
        data.append("banner", formData.banner);
      }
      if (formData.paymentQR) {
        data.append("paymentQR", formData.paymentQR);
      }      
      if (editEventId) {
        const response = await nodeApi.put(
          `/event/${editEventId}`,
          data
        );
        setEditEventId(null);
        alert(response.data.message);
      } else {
        const response = await nodeApi.post(`/event`, data);
        alert(response.data.message);
      }

      setFormData({
        eventName: "",
        eventDescription: "", // Reset new field
        nameOfSpeaker: "",
        organizationOfSpeaker: "", // Reset new field
        locationOfSpeaker: "", // Reset new field
        eventNotice: "",
        date: "",
        eventDeadline: "",
        category: "",
        time: "",
        department: [],
        eligible_degree_year: [],
        isPaid: false,
        isOnline: false,
        eventLink: null,
        cost: null,
        banner: null,
        paymentQR: null,
      });
      setError("");
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="w-full lg:w-[100%] p-8 border border-gray-300 shadow-md rounded-lg text-black">
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
      <label className="font-semibold mb-1 w-1/4">Speaker Name:</label>
      <input
        type="text"
        name="nameOfSpeaker"
        value={formData.nameOfSpeaker}
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
      <label className="font-semibold mb-1 w-1/4">Event Deadline:</label>
      <input
        type="datetime-local"
        name="eventDeadline"
        value={formData.eventDeadline}
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
        <option value="Placement">Placement</option>
        <option value="Higher Studies">Higher Studies</option>
        <option value="Entrepreneurship">Entrepreneurship</option>
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
      <label className="font-semibold mb-1 w-1/4">Speaker Organization:</label>
      <input
        type="text"
        name="organizationOfSpeaker"
        value={formData.organizationOfSpeaker}
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      />
    </div>

    {/* Speaker Location */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Speaker Location:</label>
      <input
        type="text"
        name="locationOfSpeaker"
        value={formData.locationOfSpeaker}
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
      <label className="font-semibold mb-1 w-1/4">Banner:</label>
      <input
        type="file"
        name="banner"
        onChange={handleChange}
        className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
      />
    </div>

    {/* Is the event Online? */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Is the event Online?</label>
      <div className="flex border border-gray-300 p-4 rounded-lg w-3/4">
        <label className="flex items-center mr-6">
          <input
            type="radio"
            name="isOnline"
            value={true}
            checked={formData.isOnline === true}
            onChange={handleChange}
            className="mr-2 custom-radio-input"
            style={{ width: "24px", height: "24px" }} // Apply size
          />
          Online
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="isOnline"
            value={false}
            checked={formData.isOnline === false}
            onChange={handleChange}
            className="mr-2 custom-radio-input"
            style={{ width: "24px", height: "24px" }} // Apply size
          />
          Offline
        </label>
      </div>
    </div>

    {formData.isOnline && (
      <div className="flex items-center w-full">
        <label className="font-semibold mb-1 w-1/4">Event Link:</label>
        <input
          type="text"
          name="eventLink"
          value={formData.eventLink}
          onChange={handleChange}
          className="w-3/4 p-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-blue-400"
        />
      </div>
    )}

    {/* Is the event Paid? */}
    <div className="flex items-center w-full">
      <label className="font-semibold mb-1 w-1/4">Is the event Paid?</label>
      <div className="flex border border-gray-300 p-4 rounded-lg w-3/4">
        <label className="flex items-center mr-6">
          <input
            type="radio"
            name="isPaid"
            value={true}
            checked={formData.isPaid === true}
            onChange={handleChange}
            className="mr-2 custom-radio-input"
            style={{ width: "24px", height: "24px" }} // Apply size
          />
          Paid
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="isPaid"
            value={false}
            checked={formData.isPaid === false}
            onChange={handleChange}
            className="mr-2 custom-radio-input"
            style={{ width: "24px", height: "24px" }} // Apply size
          />
          Free
        </label>
      </div>
    </div>

    {formData.isPaid && (
      <div className="flex items-center w-full">
        <label className="font-semibold mb-1 w-1/4">Payment Amount:</label>
        <input
          type="text"
          name="paymentAmount"
          value={formData.paymentAmount}
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
        <option value="Upcoming">Upcoming</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

    {/* Submit Button */}
    <div className="text-center mt-6">
      <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 w-full">
        Create Event
      </button>
    </div>
  </form>
</div>

  
  );
}

export default CreateEvent;
