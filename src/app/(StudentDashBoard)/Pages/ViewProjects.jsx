import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";
import CustomAlert from "@/components/customAlert";
import { FaThumbsUp, FaEye, FaCommentDots } from "react-icons/fa";
import Image from "next/image";

// import CustomAlert from "../components/customAlert";

const EventCompo = () => {
  const { data: session, status } = useSession();

  const [openPayBoxes, setOpenPayBoxes] = useState([]);
  const [openPaymentBoxes, setOpenPaymentBoxes] = useState([]); // New state for payment section
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionIds, setTransactionIds] = useState({});
  const [transactionErrors, setTransactionErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(""); // State for custom alert message
  const [showAlert, setShowAlert] = useState(false); // State to show or hide the custom alert

  const StdID = "3"; // Placeholder student ID, adjust as needed


  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session && session.user) {
        const userID = session.user.id;
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    
        try {
          setLoading(true);
          const response = await axios.get(`https://cesa-csi-pvppcoe.vercel.app/api/studentprojects?userId=${userID}`, {
            headers: {
              'Authorization': API_KEY, // Pass API key in Authorization header
            },
          });
    
          setData(response.data); // assuming response.data contains the data
          console.log(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchData();
  }, [status, session]); // Ensure dependencies are provided
  
  

  const handleTogglePay = (index) => {
    const newOpenPayBoxes = [...openPayBoxes];
    newOpenPayBoxes[index] = !newOpenPayBoxes[index];
    setOpenPayBoxes(newOpenPayBoxes);
  };

  const handleTogglePayment = (index) => {
    const newOpenPaymentBoxes = [...openPaymentBoxes];
    newOpenPaymentBoxes[index] = !newOpenPaymentBoxes[index];
    setOpenPaymentBoxes(newOpenPaymentBoxes);
  };

  const handleTransactionIdChange = (eventId, value) => {
    setTransactionIds((prevState) => ({
      ...prevState,
      [eventId]: value.trim(),
    }));

    setTransactionErrors((prevState) => ({
      ...prevState,
      [eventId]: "",
    }));
  };

  const registerClicked = async (event, eventId, isPaid) => {
    event.preventDefault();

    if (
      isPaid &&
      (!transactionIds[eventId] || transactionIds[eventId].trim() === "")
    ) {
      setAlertMessage("Please enter the transaction ID for paid events.");
      setTransactionErrors((prevState) => ({
        ...prevState,
        [eventId]: "Transaction ID is required for paid events.",
      }));
      setShowAlert(true);
      return;
    }

    const transactionId = isPaid ? transactionIds[eventId].trim() : null;

    try {
      const response = await nodeApi.post(
        `/userEventReg/${eventId}`,
        {
          student_id: StdID,
          transaction_id: transactionId,
        }
      );

      if (response.data) {
        alert(response.data.message);
      } else {
        alert("Registration failed.");
      }
    } catch (err) {
      alert("An error occurred during registration: " + err.message);
    }
  };

  if (loading) {
    return    <div className="flex justify-center items-center  h-full">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)} // Close the alert
        />
      )}
    
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-8 items-start justify-center py-10 w-full">
          {data.map(
            (event, index) =>
              !event.isDeleted && (
                <div
                  key={index}
                  className="bg-white border-2 border-blue-400 rounded-xl p-8 w-full md:w-[48%] lg:w-[45%] xl:w-[38%] flex flex-col justify-between "
                >
                  {/* Header with Event Name and Toggle Button */}
                  <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg px-6 py-4 mb-6 ">
                    <h3 className="text-white text-3xl font-bold font-sans tracking-wide">
                      {event.eventName}
                    </h3>
                    <button
                      className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg transition-colors duration-300"
                      onClick={() => handleTogglePay(index)}
                    >
                      {openPayBoxes[index] ? "Hide Details" : "Show Details"}
                    </button>
                  </div>
    
                  {/* Main Content Section */}
                  <div className="mt-4 flex flex-col md:flex-row gap-8">
                    {/* Event Image Section */}
                    <div className="w-full md:w-1/2">
                      <h4 className="text-2xl font-semibold text-gray-800 mb-4">Event Photo:</h4>
                      {event.image && (
                        <Image
                        width={500}
                        height={500}
                          src={event.image}
                          alt="Event"
                          className="w-full h-48 object-cover rounded-xl shadow-lg"
                        />
                      )}
                    </div>
    
                    {/* Certificate Image Section */}
                    {event.certificate && (
                      <div className="w-full md:w-1/2">
                        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Certificate:</h4>
                        <Image
                          width={500}
                          height={500}
                          src={event.certificate}
                          alt="Certificate"
                          className="w-full h-48 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    )}
                  </div>
    
                  {/* Event Information */}
                  <div className="mt-6 space-y-4 text-gray-800">
                    <p className="text-2xl font-semibold border-b-2 border-blue-400 pb-2">
                      <strong>College Name:</strong> {event.collegename}
                    </p>
                    <p className="text-lg bg-gray-100 p-3 rounded-lg">
                      <strong>Description:</strong> {event.eventDescription}
                    </p>
                    <p className="text-lg bg-gray-100 p-3 rounded-lg">
                      <strong>Organization:</strong> {event.organization}
                    </p>
                    <p className="text-lg bg-gray-100 p-3 rounded-lg">
                      <strong>Location:</strong> {event.location}
                    </p>
                    <p className="text-lg bg-gray-100 p-3 rounded-lg">
                      <strong>Date:</strong> {event.date.split("T")[0]}
                    </p>
                    <p className="text-lg bg-gray-100 p-3 rounded-lg">
                      <strong>Deadline:</strong> {event.eventDate.split("T")[0]}
                    </p>
                    <p className="text-lg bg-gray-100 p-3 rounded-lg">
                      <strong>Time:</strong> {event.time}
                    </p>
                    <p className="text-lg bg-gray-100 p-3 rounded-lg">
                      <strong>Prize:</strong> {event.ismoney ? "YES" : "NO"}
                    </p>
    
                    {openPayBoxes[index] && (
                      <>
                        <p className="text-lg bg-gray-100 p-3 rounded-lg">
                          <strong>Department:</strong> {event.department.join(", ")}
                        </p>
                        <p className="text-lg bg-gray-100 p-3 rounded-lg">
                          <strong>Eligible Year:</strong> {event.eligible_degree_year.join(", ")}
                        </p>
                        <a
                          className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors duration-300"
                          href={`http://localhost:8000/${event.eventNotice}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Event Notice
                        </a>
                      </>
                    )}
                  </div>
    
                  {/* Footer with Likes, Views, Comments */}
                  <div className="flex justify-around items-center mt-6 border-t pt-4 text-gray-600">
                    <div className="text-center">
                      <FaThumbsUp className="text-3xl text-blue-600 hover:text-blue-800 transition-colors duration-300" />
                      <p className="text-lg font-semibold">Likes</p>
                    </div>
                    <div className="text-center">
                      <FaEye className="text-3xl text-green-600 hover:text-green-800 transition-colors duration-300" />
                      <p className="text-lg font-semibold">Views</p>
                    </div>
                    <div className="text-center">
                      <FaCommentDots className="text-3xl text-purple-600 hover:text-purple-800 transition-colors duration-300" />
                      <p className="text-lg font-semibold">Comments</p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <div>No events available for your criteria.</div>
      )}
    </>
    
  
  );
};

export default EventCompo;
