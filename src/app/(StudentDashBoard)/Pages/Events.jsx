import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";

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
          const response = await axios.get(`http://localhost:3000/api/studentevent?userId=${userID}`, {
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
    return <div>Loading...</div>;
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
        <div className="flex w-full flex-wrap gap-4 items-center justify-center md:py-12  flex-col md:pl-10 ">
          {data.map(
            (event, index) =>
              !event.isDeleted && (
                <div
                key={index}
                className="bg-white border rounded-lg shadow-md p-4 w-full sm:w-1/2 lg:w-[80%] xl:w-[90%] md:min-h-[600px] md:max-h-[600px] overflow-y-hidden flex flex-col justify-start"
              >
                <div className="flex justify-between items-center p-2 bg-blue-600 rounded-lg">
                  <div>
                    <h3 className="text-white text-2xl font-semibold">
                      <strong>Event:</strong> {event.eventName}
                    </h3>
                  </div>
                  <div>
                    <button
                      className="ml-2 text-white hover:underline py-1 px-2 bg-blue-500 rounded-lg"
                      onClick={() => handleTogglePay(index)}
                    >
                      {openPayBoxes[index] ? "Hide Details" : "Show Details"}
                    </button>
                  </div>
                </div>
              
                <div className="mt-4">
                  {/* Event Image and Certificate Section */}
                  <div className="flex flex-col md:flex-row w-full gap-4">
                    {/* Event Image Section */}
                    <div className="flex flex-col w-full md:w-1/2">
                      <h4 className="text-lg font-semibold">Photo:</h4>
                      {event.image && (
                        <img
                          src={event.image}
                          alt="Event"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      )}
                    </div>
              
                    {/* Certificate Image Section */}
                    {event.certificate && (
                      <div className="flex flex-col w-full md:w-1/2">
                        <h4 className="text-lg font-semibold">Certificate:</h4>
                        <img
                          src={event.certificate}
                          alt="Certificate"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
              
                  {/* Event Information */}
                  <div className="mt-4">
                    <p className="text-lg">
                      <strong>College Name:</strong> {event.collegename}
                    </p>
                    <p className="text-lg">
                      <strong>Description:</strong> {event.eventDescription}
                    </p>
                    <p className="text-lg">
                      <strong>Organization:</strong> {event.organization}
                    </p>
                    <p className="text-lg">
                      <strong>Location:</strong> {event.location}
                    </p>
                    <p className="text-lg">
                      <strong>Date:</strong> {event.date.split("T")[0]}
                    </p>
                    <p className="text-lg">
                      <strong>Deadline:</strong> {event.eventDate.split("T")[0]}
                    </p>
                    <p className="text-lg">
                      <strong>Time:</strong> {event.time}
                    </p>
                    <p className="text-lg">
                      <strong>Prize:</strong> {event.ismoney ? "YES" : "NO"}
                    </p>
              
                    {openPayBoxes[index] && (
                      <>
                        <p className="text-lg">
                          <strong>Department:</strong> {event.department.join(", ")}
                        </p>
                        <p className="text-lg">
                          <strong>Eligible Year:</strong> {event.eligible_degree_year.join(", ")}
                        </p>
                        <a
                          className="text-blue-700 font-bold underline"
                          href={`http://localhost:8000/${event.eventNotice}`} // Update to the correct field for the notice
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Notice
                        </a>
                      </>
                    )}
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
