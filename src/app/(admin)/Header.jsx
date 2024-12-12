"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaCalendar, FaImage, FaUserFriends, FaClipboardList } from "react-icons/fa";

const AdminHeader = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setActiveMenu((prevState) => !prevState);
  };

  return (
    <div className="w-[90%] h-[97vh] rounded-xl bg-[#1b1b1b] text-white">
      {/* Sidebar */}
      <div className="xl:w-[100%] h-full  justify-center item-center bg-black-800 flex-col hidden xl:flex">
        <nav className="flex-grow px-4 py-6  justify-center item-center flex h-[100%]">
          <ul className="space-y-2 mt-4">
            <li>
              <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-[#272626]">
                <FaHome className="mr-2" />
                <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Home page</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin" className="flex items-center p-2 rounded-lg hover:bg-[#272626]">
                <FaHome className="mr-2" />
                <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/upcoming" className="flex items-center p-2 rounded-lg hover:bg-[#272626]">
                <FaClipboardList className="mr-2" />
                <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Upcoming</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/viewupcoming" className="flex items-center p-2 rounded-lg hover:bg-[#272626]">
                <FaClipboardList className="mr-2" />
                <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">View Upcoming</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/Events" className="flex items-center p-2 rounded-lg hover:bg-[#272626]">
                <FaCalendar className="mr-2" />
                <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Event</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/viewevents" className="flex items-center p-2 rounded-lg hover:bg-[#272626]">
                <FaClipboardList className="mr-2" />
                <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">View Event</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/gallery" className="flex items-center p-2 rounded-lg hover:bg-[#272626]">
                <FaImage className="mr-2" />
                <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Gallery</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/viewgallery" className="flex items-center p-2 rounded-lg hover:bg-[#272626]">
                <FaClipboardList className="mr-2" />
                <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">View Gallery</span>
              </Link>
            </li>
            {/* <li>
              <Link href="/Admin/honorory" className="flex items-center p-2 rounded-lg hover:bg-[#272626]">
                <FaUserFriends className="mr-2" />
                <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Add Members</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>

      {/* Hamburger Menu */}
      <div className="relative flex items-center h-[10vh] justify-center w-full z-50 lg:hidden">
        <div className="flex flex-col justify-center items-center cursor-pointer" onClick={toggleMenu}>
          <div
            className={`w-8 h-1 bg-white mb-1 transition-all duration-300 ${activeMenu ? 'rotate-45 translate-y-2' : ''}`}
          ></div>
          <div
            className={`w-8 h-1 bg-white mb-1 transition-all duration-300 ${activeMenu ? 'opacity-0' : ''}`}
          ></div>
          <div
            className={`w-8 h-1 bg-white transition-all duration-300 ${activeMenu ? '-rotate-45 -translate-y-2' : ''}`}
          ></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {activeMenu && (
        <div className="lg:hidden absolute left-0 w-full bg-red-900 z-40">
          <nav className="flex flex-col items-center">
            <ul className="flex flex-col items-center gap-4 py-4">
              <li>
                <Link href="/" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  HomePage
                </Link>
              </li>
              <li>
                <Link href="/Admin/Members" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Upcoming Event
                </Link>
              </li>
              <li>
                <Link href="/Admin/Events" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/Admin/gallery" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/Admin/honorory" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Members
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
