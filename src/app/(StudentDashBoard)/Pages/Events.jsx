import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";
import DeleteAlert from "../Components/DeletePopUp"
import EditBox from "../Components/EditBox"
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Alert from "../Components/Alert"


// import CustomAlert from "../components/customAlert";

const EventCompo = () => {
  const [type, setType] = useState("");

  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const [execute, setExecute] = useState(false);
  const [Description, setDescription] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [studentData, setStudentData] = useState({
    name: "Your Name",
    vid: "Your VID",
    class: "Your Class",
    batch: "Your Batch",
    div: "Your Division",
    sem: "Your Sem",
    year: "Current Year"
});
const [isDialogOpen, setIsDialogOpen] = useState(false);


  const [openPayBoxes, setOpenPayBoxes] = useState([]);

  const [openPaymentBoxes, setOpenPaymentBoxes] = useState([]); // New state for payment section
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false); // This will handle the loading state for delete

  const [error, setError] = useState(null);
  const [transactionIds, setTransactionIds] = useState({});
  const [transactionErrors, setTransactionErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(""); // State for custom alert message
  const [showAlert, setShowAlert] = useState(false); // State to show or hide the custom alert

  const StdID = "3"; // Placeholder student ID, adjust as needed


  // const [showAlert, setShowAlert] = useState(false);
  // const [alertMessage, setAlertMessage] = useState('');
  const [currentEventIndex, setCurrentEventIndex] = useState(null);
  const [StudentIndex, setStudentIndex] = useState(null);


  
 

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session && session.user) {
        const userID = session.user.id;
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    
        try {
          setLoading(true);
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
  
  const confirmDelete = (index) => {
    setCurrentEventIndex(index);
    setAlertMessage('Are you sure you want to delete this event?');
    setShowAlert(true);
  };

  const fetchData = async () => {
    if (status === "authenticated" && session && session.user) {
      const userID = session.user.id;
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  
      try {
        setLoading(true);
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


const handleConfirmDelete = async () => {
    fetchData();
    setExecute(true); // Set execute flag
};

useEffect(() => {
    // This will run whenever execute changes
    if (execute) {
        setMessage("Alert!!.");
        setDescription("Delete Successfully.");
        setType("info");
        setIsPopupVisible(true);
        console.log("Popup state set to true");
    }
}, [execute]); // Dependency array ensures this runs only when 'execute' changes

useEffect(() => {
  // Persist `isPopupVisible` in local storage or session storage
  if (isPopupVisible) {
      localStorage.setItem('isPopupVisible', 'true');
  }
}, [isPopupVisible]);


const fetchStudentData = async () => {
  if (status === "authenticated" && session && session.user) {
      const userID = session.user.id;
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

      try {
          setLoading(true); 
          const response = await axios.get(`http://localhost:3000/api/student?userId=${userID}`, {
              headers: {
                  Authorization: `${API_KEY}`,
                  "Content-Type": "application/json",
              },
          });

          if (response.status === 200) {
              setStudentData(response.data);
          } else {
              setError("No data found.");
          }
      } catch (error) {
          console.error("Error fetching student details:", error);
          setError("An error occurred while fetching student details.");
      } finally {
          setLoading(false); 
      }
  }
};
const handleUpdateEvent = (studentId) => {
  setStudentIndex(studentId)
  setIsDialogOpen(true);
};

const handleSave = () => {
  fetchStudentData(); // Fetch data after saving
};

const handleDialogClose = () => {
  setIsDialogOpen(false);
};
  

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
      <DeleteAlert
        message={alertMessage}
        onConfirm={handleConfirmDelete}
        currentEventIndex={currentEventIndex}
        onCancel={() => setShowAlert(false)}
      />
    )}
      <EditBox 
                isOpen={isDialogOpen} 
                StudentIndex={StudentIndex}
                onClose={handleDialogClose} 
                studentData={studentData} 
                onSave={handleSave}        


            />
             {isPopupVisible && (
      <Alert message={message} Description={Description} type={type}  />
    )}

    {data.length > 0 ? (
      <div className="flex flex-wrap gap-8 items-center justify-center py-10 w-full">
        {data.map((event, index) =>
          !event.isDeleted && (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 shadow-lg rounded-lg overflow-hidden w-full md:w-[48%] lg:w-[45%] xl:w-[40%] flex flex-col h-[650px]"
            >
              {/* Header Section with Buttons */}
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-white text-2xl font-bold font-sans tracking-wide">
                  {event.eventName}
                </h3>
                <div className="absolute flex justify-center items-center top-2 right-2 gap-2">
                
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-6 py-2 rounded-xl flex items-center gap-1"
                    onClick={() => handleUpdateEvent(event._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-xl flex items-center gap-1"
                    onClick={() => confirmDelete(event._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-6 p-6">
                {event.image && (
                  <div className="w-full h-[280px]">
                    <img
                      src={event.image}
                      alt="Event"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}

                <div className="text-gray-800 space-y-4">
                  <div className="flex justify-between">
                    <p className="text-lg"><strong>College:</strong> {event.collegename}</p>
                    <p className="text-lg"><strong>Organization:</strong> {event.organization}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg"><strong>Location:</strong> {event.location}</p>
                    <p className="text-lg"><strong>Date:</strong> {event.date.split("T")[0]}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg"><strong>Deadline:</strong> {event.eventDate.split("T")[0]}</p>
                    <p className="text-lg"><strong>Time:</strong> {event.time}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg"><strong>Prize:</strong> {event.ismoney ? "YES" : "NO"}</p>
                    <p className="text-lg"><strong>Eligible Year:</strong> {event.eligible_degree_year.join(", ")}</p>
                  </div>

                  {openPayBoxes[index] && (
                    <>
                      <p className="text-lg"><strong>Department:</strong> {event.department.join(", ")}</p>
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
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center bg-gray-100 px-6 py-4">
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg transition-all duration-300"
                  onClick={() => handleTogglePay(index)}
                >
                  {openPayBoxes[index] ? "Hide Details" : "Show Details"}
                </button>
                <p className="text-lg font-semibold">
                  {event.ismoney ? "💰 Prize Event" : "🎉 Free Event"}
                </p>
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
