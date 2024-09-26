"use client";
import abbas from "../../../Assets/IMG/abbas.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CircularProgress,LinearProgress ,Box, Typography } from '@mui/material';
import winner from "../../../Assets/IMG/winner.png";
import EditBox from "@/components/EditBox"

export default function StudentHome() {
    const [progresses, setProgresses] = useState({});
    const [events, setEvents] = useState([]);
    const [studentDatas, setStudentDatas] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [studentData, setStudentData] = useState({
        name: "Rizvi Ahmed Abbas",
        vid: "Vu1s2324006",
        class: "Comps",
        batch: "B",
        div: "C",
        sem: "5",
        image: abbas, // Default image
    });


    const handleEditClick = () => {
        setIsDialogOpen(true);
    };
    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };
    const handleSave = (updatedData) => {
        // Handle saving the updated data
        // For example, you might want to send it to a server or update local state
        setIsDialogOpen(false);
    };

    useEffect(() => {
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
    }, []);

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
                <Image src={studentData.image} className="w-[18rem] h-[18rem] rounded-full" alt="Rizvi Abbas" />
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
                    <div>
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
                </div>
            </div>


            </div>

            {/* Second Row */}
            <div className="w-full h-[100%] flex gap-3">
                <div className="w-full h-full flex flex-col gap-5">
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
                <div className="w-[30%] h-[90vh] rounded-xl bg-opacity-10 backdrop-blur-md border border-gray-300 bg-white hover:bg-opacity-20 hover:shadow-2xl transition-all duration-300 ease-in-out p-4">
                    <h3 className="text-gray-800 text-[1.5rem] font-semibold">Your Projects</h3>
                    <p className="text-gray-600 mt-3">
                        Check out your ongoing projects and completed tasks.
                    </p>
                </div>
            </div>
        </div>
   
    );
}
