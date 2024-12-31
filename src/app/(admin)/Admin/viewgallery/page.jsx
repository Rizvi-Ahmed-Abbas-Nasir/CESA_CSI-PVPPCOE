"use client";

import { FaArrowRight, FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa"; 
import NAV from "../../Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteAlert from "../../../(StudentDashBoard)/Components/DeletePopUp";
import EditBox from "../../../(StudentDashBoard)/Components/EditBox";
import toast from "react-hot-toast";
import Image from "next/image";


const ViewUpcomingEvent = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchEvents = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

      try {
        setLoading(true);

        const response = await axios.get("https://cesa-csi-pvppcoe.vercel.app/api/gallery", {
          headers: {
            Authorization: API_KEY,
          },
        });
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      }finally{
        setLoading(false);

      }
    };

    fetchEvents();
  }, []);
console.log(events)
  const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
      <div className="relative w-full h-[200px] flex items-center justify-center overflow-hidden">
        <Image
          width={500}
          height={500}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-500 ease-in-out"
        />
        <button
          className="absolute left-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
          onClick={goToPrevious}
        >
          {"<"}
        </button>
        <button
          className="absolute right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
          onClick={goToNext}
        >
          {">"}
        </button>
      </div>
    );
  };

  if (loading) {
        return (
          <div className="relative w-full h-screen bg-[#141414]">
            <NAV />
            <div className="flex gap-3 h-full w-full flex-col  overflow-y-scroll bg-[#141414] py-9 pr-8 pl-5">
              <div className="loader1 ease-linear rounded-full border-8 border-t-8 border-[#303030] bg-[#141414] h-[100px]  w-[100%]"></div>
            </div>
          </div>
        );
      }
      
  return (
    <>
      {isPopupVisible && (
        <DeleteAlert
          message="Are you sure you want to delete this event?"
          onConfirm={() => console.log("Confirmed delete")}
          onCancel={() => setIsPopupVisible(false)}
        />
      )}

      <EditBox isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

      <div className="flex w-full h-[100vh] xl:flex-row flex-col">
        <NAV />
        {events.length > 0 ? (
          <div className="flex gap-3 h-full w-full flex-col overflow-y-scroll bg-[#141414] py-9 pr-8 pl-5">
            <div className="w-full mb-4">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="w-[30%] px-4 py-3 pl-10 border rounded-full focus:ring-2 focus:ring-gray-600 border-[#202020] bg-[#202020] outline-none text-white"
                  required
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
              </div>
            </div>
            <div className="p-10 rounded-xl bg-[#1b1b1b] shadow-lg w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
                {events.map((event) => (
                  !event.isDeleted && (
                    <div
                      key={event._id}
                      className="bg-[#202020] border-2 border-[#303030] shadow-lg rounded-xl w-[95%] h-[600px] flex flex-col"
                    >
                      <div className="relative rounded-xl bg-gradient-to-r from-[#1f1e1e] to-[#202020] px-6 py-4">
                        <h3 className="text-white text-2xl font-bold font-sans tracking-wide">
                          {event.eventTitle}
                        </h3>
                        <div className="absolute flex justify-center items-center top-2 right-2 gap-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-6 py-2 rounded-xl"
                            onClick={() => console.log(`Edit event ID: ${event._id}`)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-xl"
                            onClick={() => console.log(`Delete event ID: ${event._id}`)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 p-4 items-center">
                        {event.screenshots && event.screenshots.length > 0 ? (
                          <ImageSlider images={event.screenshots} />
                        ) : (
                          <p className="text-white">No screenshots available for this event.</p>
                        )}

                        <div className="text-white space-y-2 w-full">
                          <p><strong>Associate:</strong> {event.associateName}</p>
                          <p><strong>Location:</strong> {event.location}</p>
                          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                          <p><strong>Time:</strong> {event.time}</p>
                          <p><strong>Type:</strong> {event.eventType}</p>
                          <p><strong>Description:</strong> {event.description}</p>
                          {event.websiteLink && (
                            <a
                              className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors duration-300"
                              href={event.websiteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit Website
                            </a>
                          )}
                          {event.selectedCategories.length > 0 && (
                            <p><strong>Categories:</strong> {event.selectedCategories.join(", ")}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#141414] w-full h-full">No events available for your criteria.</div>
        )}
      </div>
    </>
  );
};

export default ViewUpcomingEvent;

