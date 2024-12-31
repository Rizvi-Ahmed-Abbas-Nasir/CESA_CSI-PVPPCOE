"use client";
import abbas from "../../../Assets/IMG/person.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CircularProgress,LinearProgress ,Box, Typography } from '@mui/material';
import EditBox from "@/components/EditBox"
import axios from 'axios';
import { useSession } from "next-auth/react";
import OnScrollAnimation from "@/components/OnScrollAnimmation";
import StudentProgressChart from "@/components/charts"
import ProfileWithCharts from "@/components/CircularGraph"
import toast, { Toaster } from 'react-hot-toast';



export default function StudentHome() {
    const { data: session, status } = useSession();
    const [progresses, setProgresses] = useState({});
    const [events, setEvents] = useState([]);
    const [studentDatas, setStudentDatas] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);


    const [loadingImage, setLoadingImage] = useState(true); // Track loading state for image

    const [studentData, setStudentData] = useState({
        name: "Your Name",
        vid: "Your VID",
        class: "Your Class",
        batch: "Your Batch",
        div: "Your Division",
        sem: "Your Sem",
        image: abbas, // Default image
        year: "Current Year"
    });

   


const [error, setError] = useState(null);

const fetchStudentData = async () => {
    if (status === "authenticated" && session && session.user) {
        const userID = session.user.id;
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

        try {
            setLoading(true); 
            const response = await axios.get(`https://cesa-csi-pvppcoe.vercel.app/api/student?userId=${userID}`, {
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
const handleEditClick = () => {
    setIsDialogOpen(true);
};

const handleSave = () => {
    fetchStudentData(); // Fetch data after saving
};

const fetchData = async () => {
    if (status === "authenticated" && session && session.user) {
      const userID = session.user.id;
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get(`https://cesa-csi-pvppcoe.vercel.app/api/studentevent?userId=${userID}`, {
          headers: {
            'Authorization': API_KEY, // Pass API key in Authorization header
          },
        });

        setData(response.data); // assuming response.data contains the data
        console.log(response.data); // For debugging purposes
      } catch (err) {
        setError(err.message); // Set error state if the API call fails
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    }
  };

  const fetchData2 = async () => {
    if (status === "authenticated" && session && session.user) {
      const userID = session.user.id;
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

      try {
        setLoading2(true); // Set loading to true before fetching (separate state)
        const response = await axios.get(`https://cesa-csi-pvppcoe.vercel.app/api/studentprojects?userId=${userID}`, {
          headers: {
            'Authorization': API_KEY, // Pass API key in Authorization header
          },
        });

        setData2(response.data); // assuming response.data contains the data
        console.log(response.data); // For debugging purposes
      } catch (err) {
        setError(err.message); // Set error state if the API call fails
      } finally {
        setLoading2(false); // Set loading to false once the request is complete
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      // Trigger data fetching when session is authenticated
      fetchStudentData()
      fetchData();
      fetchData2();
    }

    // Simulating fetching events data with demo values
    const demoEvents = [
      { eventId: 4, name: "Project D", progress: 50 },
    ];
    setEvents(demoEvents);

    // Set initial demo progress values
    const initialProgress = {};
    demoEvents.forEach(event => {
      initialProgress[event.eventId] = event.progress;
    });
    setProgresses(initialProgress);

    // Animate elements on scroll
    if (typeof document !== "undefined") {
      const hiddenElements1 = document.querySelectorAll(".hidden3");
      const hiddenElements2 = document.querySelectorAll(".hidden2");
      const hiddenElements3 = document.querySelectorAll(".hidden1");
      const hiddenElements4 = document.querySelectorAll(".hidden4");

      OnScrollAnimation(hiddenElements1);
      OnScrollAnimation(hiddenElements2);
      OnScrollAnimation(hiddenElements3);
      OnScrollAnimation(hiddenElements4);
    }
  }, [session, status]);
const handleDialogClose = () => {
    setIsDialogOpen(false);
};

    return (
        <div className="h-full flex flex-wrap gap-3 p-6 bg-opacity-10 backdrop-blur-md bg-white hover:bg-opacity-20  ">
            <EditBox 
                isOpen={isDialogOpen} 
                onClose={handleDialogClose} 
                studentData={studentData} 
                onSave={handleSave} 
            />
            <div className="w-full h-[50%] flex gap-3">
            <div className="w-[30%] rounded-xl bg-opacity-10 backdrop-blur-md border border-gray-200 bg-slate-50 ease-in-out relative">
            <div className="w-full flex flex-col items-center justify-center py-6">
                   {/* Image Loading Animation */}
                   {loading && (
                        <div className="flex justify-center items-center h-48">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
                        </div>
                    )}
                    <Image 
                        src={studentData.image || abbas} 
                        width={288} // Corresponds to 18rem (1 rem = 16px)
                        height={288} // Corresponds to 18rem
                        className={`w-[18rem] h-[18rem] rounded-full ${loading ? 'hidden' : ''}`} 
                        alt="Student Image" 
                       
                    />
                    <button 
                        className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-2 rounded-lg shadow-md hover:bg-blue-600"
                        onClick={handleEditClick}
                    >
                        Edit
                </button> 
            </div>

            </div>

            <div className="w-[70%] rounded-xl bg-opacity-10 backdrop-blur-md border border-gray-300 bg-white p-4 relative">
                <h3 className="text-gray-800 text-[1.5rem] font-semibold">Your Profile</h3>
                <button 
                    className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-2 rounded-lg shadow-md hover:bg-blue-600"
                    onClick={handleEditClick}
                >
                    Edit
                </button>
                <div className="w-full flex justify-start items-center h-[60%] gap-20 mt-6">
                <div className="w-full flex justify-evenly">
            {loading ? (
                // Show the loading spinner while fetching data
                <div className="flex justify-center items-center h-48">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
                </div>
            ) : (
                // Show student data once loading is complete
                <div className="w-[100%]">
                    <div className="flex items-center mt-2">
                        <h3 className="text-gray-600 text-[1.3rem]">NAME:</h3>
                        <p className="ml-2 text-[1.3rem]">{studentData.name}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <h3 className="text-gray-600 text-[1.3rem]">VID:</h3>
                        <p className="ml-2 text-[1.3rem]">{studentData.vid}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <h3 className="text-gray-600 text-[1.3rem]">CLASS:</h3>
                        <p className="ml-2 text-[1.3rem]">{studentData.class}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <h3 className="text-gray-600 text-[1.3rem]">BATCH:</h3>
                        <p className="ml-2 text-[1.3rem]">{studentData.batch}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <h3 className="text-gray-600 text-[1.3rem]">DIV:</h3>
                        <p className="ml-2 text-[1.3rem]">{studentData.div}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <h3 className="text-gray-600 text-[1.3rem]">SEM:</h3>
                        <p className="ml-2 text-[1.3rem]">{studentData.sem}</p>
                    </div>
                </div>
            )}
        </div>
                    <div className=""><ProfileWithCharts studentData={studentData} handleEditClick={handleEditClick} /> </div>
                   

                </div>
            </div>


            </div>

            {/* Second Row */}
            <div className="w-full h-[200%] flex gap-3">
                <div className="w-full h-full flex flex-col gap-5">
                <div className="w-[100%] h-full items-center justify-around flex rounded-xl bg-opacity-10 backdrop-blur-md border border-gray-300 bg-white  ease-in-out p-4">
                <div className="flex flex-col items-center justify-center rounded-xl w-[100%] h-auto">
    <StudentProgressChart />
</div>

              
             </div>
                <div className="w-[100%] h-full items-center justify-around flex rounded-xl bg-opacity-10 backdrop-blur-md border border-gray-300 bg-white  ease-in-out p-4">
              
              
                <div className="flex flex-col border items-center justify-center rounded-xl w-[40%] h-auto">
                    
    <div className="mb-4">Overall Progress</div>
    <div className="w-full">
        {events.map((event) => (
            <div key={event.eventId} className="mb-4 p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex w-full justify-between">
                        <div>                    <p>Skills</p>
                        </div>
                    <div className="flex justify-between mb-2">
                    <div className="font-semibold">{event.eventName}</div>
                    <div className="font-semibold">{`${Math.round(progresses[event.eventId] || 0)}%`}</div>
                </div>
                    </div>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress
                        variant="determinate"
                        value={progresses[event.eventId] || 0}
                        sx={{
                            height: 15, // Adjust height for a thicker progress bar
                            borderRadius: 5, // Make the edges rounded
                            backgroundColor: '#e0e0e0', // Background of the progress bar
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: (progresses[event.eventId] || 0) === 100 ? '#4caf50' : '#1976d2', // Color based on completion
                            },
                        }}
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress
                        variant="determinate"
                        value={progresses[event.eventId] || 0}
                        sx={{
                            height: 15, // Adjust height for a thicker progress bar
                            borderRadius: 5, // Make the edges rounded
                            backgroundColor: '#e0e0e0', // Background of the progress bar
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: (progresses[event.eventId] || 0) === 100 ? '#4caf50' : '#1976d2', // Color based on completion
                            },
                        }}
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress
                        variant="determinate"
                        value={progresses[event.eventId] || 0}
                        sx={{
                            height: 15, // Adjust height for a thicker progress bar
                            borderRadius: 5, // Make the edges rounded
                            backgroundColor: '#e0e0e0', // Background of the progress bar
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: (progresses[event.eventId] || 0) === 100 ? '#4caf50' : '#1976d2', // Color based on completion
                            },
                        }}
                    />
                </Box>
                </div>
            </div>
        ))}
    </div>
</div>


 

<div className="flex flex-col border items-center justify-center rounded-xl w-[25%] h-[60%] ">
    <div className="mb-4">Overall Progress</div>
    <div className="flex flex-wrap justify-around w-full">
        {events.map((event) => (
            <div key={event.eventId} className="flex flex-col items-center mb-4 mx-2">
                <div className="flex w-full justify-center">
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid gray',
                            borderRadius: '50%',
                            width: '120px',  // Circular container size
                            height: '120px', // Circular container size
                        }}
                    >
                        <CircularProgress
                            variant="determinate"
                            value={progresses[event.eventId] || 0}
                            size={110} // Circle size
                            thickness={6} // Adjust the thickness to match the rounded look
                            style={{
                                color: (progresses[event.eventId] || 0) === 100 ? '#4caf50' : '#1976d2', // Green for 100%, Blue for <100%
                                strokeLinecap: 'round', // Add rounding at the ends of the circle progress bar
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography 
                                variant="caption" 
                                component="div" 
                                color="textSecondary" 
                                fontSize={22} // Font size for percentage
                                fontWeight="bold"
                            >
                                {`${Math.round(progresses[event.eventId] || 0)}%`}
                            </Typography>
                        </Box>
                    </Box>
                </div>
            </div>
        ))}
    </div>
</div>
                </div>

                <div className="w-[100%] h-full items-center flex rounded-xl bg-opacity-10 backdrop-blur-md border border-gray-300 bg-white  p-4">
                <div className="w-[100%] h-full items-center justify-around flex " >
                <div className="flex flex-col border items-center justify-center rounded-xl w-[25%] h-[60%] ">
  <div className="mb-4">Overall Progress</div>
  <div className="flex flex-wrap justify-around w-full">
      {events.map((event) => (
          <div key={event.eventId} className="flex flex-col items-center mb-4 mx-2">
              <div className="flex w-full justify-center">
                  <Box
                      sx={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid gray',
                          borderRadius: '50%',
                          width: '120px',  // Circular container size
                          height: '120px', // Circular container size
                      }}
                  >
                      <CircularProgress
                          variant="determinate"
                          value={progresses[event.eventId] || 0}
                          size={110} // Circle size
                          thickness={6} // Adjust the thickness to match the rounded look
                          style={{
                              color: (progresses[event.eventId] || 0) === 100 ? '#4caf50' : '#1976d2', // Green for 100%, Blue for <100%
                              strokeLinecap: 'round', // Add rounding at the ends of the circle progress bar
                          }}
                      />
                      <Box
                          sx={{
                              position: 'absolute',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                          }}
                      >
                          <Typography 
                              variant="caption" 
                              component="div" 
                              color="textSecondary" 
                              fontSize={22} // Font size for percentage
                              fontWeight="bold"
                          >
                              {`${Math.round(progresses[event.eventId] || 0)}%`}
                          </Typography>
                      </Box>
                  </Box>
              </div>
          </div>
      ))}
  </div>
</div>
                <div className="flex flex-col border items-center justify-center rounded-xl w-[40%] h-auto">
    <div className="mb-4">Overall Progress</div>
    <div className="flex justify-around w-full">
        {events.map((event) => (
            <div key={event.eventId} className="flex flex-col items-center mx-2">
                {/* Event name above the progress bar */}
                <div className="mb-2 font-semibold">{event.eventName}</div>
                <div className="flex gap-5">
                    <div>
                    <Box
                    sx={{
                        height: '150px', // Adjust the height for a taller bar
                        width: '20px', // Adjust the width for a thinner vertical bar
                        display: 'flex',
                        alignItems: 'flex-end', // Align the progress at the bottom
                        justifyContent: 'center',
                        backgroundColor: '#e0e0e0', // Background for the container
                        borderRadius: '10px', // Rounding edges for a smooth look
                        overflow: 'hidden', // To ensure content is properly contained within borders
                    }}
                >
                    {/* Inner container to control the progress */}
                    <Box
                        sx={{
                            height: `${progresses[event.eventId] || 0}%`, // Control the height based on progress percentage
                            width: '100%',  // Fill the width of the container
                            backgroundColor: (progresses[event.eventId] || 0) === 100 ? '#4caf50' : '#1976d2', // Color logic
                            transition: 'height 0.5s ease-in-out', // Smooth transition for progress updates
                        }}
                    />
                </Box>

                {/* Progress percentage below the progress bar */}
                <div className="mt-2 font-semibold">{`${Math.round(progresses[event.eventId] || 0)}%`}</div>
                    </div>
                    <div>
                    <Box
                    sx={{
                        height: '150px', // Adjust the height for a taller bar
                        width: '20px', // Adjust the width for a thinner vertical bar
                        display: 'flex',
                        alignItems: 'flex-end', // Align the progress at the bottom
                        justifyContent: 'center',
                        backgroundColor: '#e0e0e0', // Background for the container
                        borderRadius: '10px', // Rounding edges for a smooth look
                        overflow: 'hidden', // To ensure content is properly contained within borders
                    }}
                >
                    {/* Inner container to control the progress */}
                    <Box
                        sx={{
                            height: `${progresses[event.eventId] || 0}%`, // Control the height based on progress percentage
                            width: '100%',  // Fill the width of the container
                            backgroundColor: (progresses[event.eventId] || 0) === 100 ? '#4caf50' : '#1976d2', // Color logic
                            transition: 'height 0.5s ease-in-out', // Smooth transition for progress updates
                        }}
                    />
                </Box>

                {/* Progress percentage below the progress bar */}
                <div className="mt-2 font-semibold">{`${Math.round(progresses[event.eventId] || 0)}%`}</div>
                    </div>
                    <div>
                    <Box
                    sx={{
                        height: '150px', // Adjust the height for a taller bar
                        width: '20px', // Adjust the width for a thinner vertical bar
                        display: 'flex',
                        alignItems: 'flex-end', // Align the progress at the bottom
                        justifyContent: 'center',
                        backgroundColor: '#e0e0e0', // Background for the container
                        borderRadius: '10px', // Rounding edges for a smooth look
                        overflow: 'hidden', // To ensure content is properly contained within borders
                    }}
                >
                    {/* Inner container to control the progress */}
                    <Box
                        sx={{
                            height: `${progresses[event.eventId] || 0}%`, // Control the height based on progress percentage
                            width: '100%',  // Fill the width of the container
                            backgroundColor: (progresses[event.eventId] || 0) === 100 ? '#4caf50' : '#1976d2', // Color logic
                            transition: 'height 0.5s ease-in-out', // Smooth transition for progress updates
                        }}
                    />
                </Box>

                {/* Progress percentage below the progress bar */}
                <div className="mt-2 font-semibold">{`${Math.round(progresses[event.eventId] || 0)}%`}</div>
                    </div>
                </div>
             
            </div>
        ))}
    </div>
</div>




              </div>
                    
                </div>
           
                </div>
                {/* Second Content Section */}
                <div className="w-[30%] h-[100%] flex flex-col gap-3">
                <div className="w-[100%] h-[100%] rounded-xl bg-opacity-10 backdrop-blur-md border border-gray-300 bg-white hover:bg-opacity-20 hover:shadow-2xl transition-all duration-300 ease-in-out p-4">
  <h3 className="text-gray-800 text-[1.5rem] font-semibold">Your Activities</h3>
  <p className="text-gray-600 mt-3">View all your activities.</p>

  {/* Loading Animation */}
  {loading ? (
    <div className="flex justify-center items-center mt-6 w-full h-full">
      <div className="loader"></div> {/* Add your CSS spinner here */}
    </div>
  ) : error ? (
    // Display error message if any error occurs during fetching
    <p className="mt-4 text-gray-800">No Activity Found!!!</p>
  ) : (
    // Scrollable container for fetched data
    <div className="mt-4 overflow-y-auto max-h-[650px]">
      {data.length > 0 ? (
        data.map((event, index) => (
          <div key={index} className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
            <h4 className="text-gray-800 text-lg font-bold">{event.eventName}</h4>
            <p className="text-gray-600">{event.collegeName}</p>
            <p className="text-gray-600">Date: {event.eventDate.split("T")[0]}</p>
            <p className="text-gray-600">Location: {event.location}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No events found</p>
      )}
    </div>
  )}
</div>

<div className="w-[100%] h-[100%] rounded-xl bg-opacity-10 backdrop-blur-md border border-gray-300 bg-white hover:bg-opacity-20 hover:shadow-2xl transition-all duration-300 ease-in-out p-4">
  <h3 className="text-gray-800 text-[1.5rem] font-semibold">Your Activities</h3>
  <p className="text-gray-600 mt-3">View all your activities.</p>

  {/* Loading Animation */}
  {loading ? (
    <div className="flex justify-center items-center mt-6 w-full h-full">
      <div className="loader"></div> {/* Add your CSS spinner here */}
    </div>
  ) : error ? (
    // Display error message if any error occurs during fetching
    <p className="mt-4 text-gray-800">No Activity Found!!!</p>
  ) : (
    // Scrollable container for fetched data
    <div className="mt-4 overflow-y-auto max-h-[650px]">
      {data2.length > 0 ? (
        data2.map((event, index) => (
          <div key={index} className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
            <h4 className="text-gray-800 text-lg font-bold">{event.eventName}</h4>
            <p className="text-gray-600">{event.collegeName}</p>
            <p className="text-gray-600">Date: {event.eventDate.split("T")[0]}</p>
            <p className="text-gray-600">Location: {event.location}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No events found</p>
      )}
    </div>
  )}
</div>

                </div>
            </div>
        </div>
   
    );
}
