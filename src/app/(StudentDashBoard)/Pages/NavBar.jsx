"use client";
import Image from "next/image";
import { MdHome, MdAddCircleOutline, MdVisibility, MdChat, MdLock, MdDescription, MdSettings, MdPerson } from "react-icons/md"; // Updated icons
import abbas from "../../../Assets/IMG/abbas.jpg";
import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="w-[95%] h-[97vh] flex rounded-xl items-center justify-start bg-blue-700">
      <div className="w-full h-full flex flex-col p-4">
        
        <div className="w-full flex flex-col items-center justify-center py-6">
          <Image src={abbas} className="w-[8rem] h-[8rem] rounded-full" alt="Rizvi Abbas" />
          <h4 className="text-white text-[1.2rem] font-semibold mt-3 text-center">Rizvi Abbas</h4>
        </div>

        <div className="w-full flex flex-col items-start justify-center py-8">
          <ul className="flex flex-col text-white gap-4 w-full">
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <MdHome className="text-xl" />
              <Link
                  href="/StudentDashBoard"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-blue-500 text-[1.2rem] p-2 rounded'
                      : 'text-[1.2rem] hover:bg-blue-500 p-2 rounded'
                  }
                  end
                >
                  Home
                </Link>
            </li>

            {/* Add Activity */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <MdAddCircleOutline className="text-xl" /> {/* New icon */}
              <Link
                  href="/Activities"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-blue-500 text-[1.2rem] p-2 rounded'
                      : 'text-[1.2rem] hover:bg-blue-500 p-2 rounded'
                  }
                  end
                >
                  Add Activity
                </Link>
            </li>

            {/* View Activities */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <MdVisibility className="text-xl" /> {/* New icon */}
              <Link
                  href="/ViewEvent"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-blue-500 text-[1.2rem] p-2 rounded'
                      : 'text-[1.2rem] hover:bg-blue-500 p-2 rounded'
                  }
                  end
                >
                  View Activities
                </Link>
            </li>

            {/* Chats */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <MdChat className="text-xl" /> {/* New icon */}
              <span>Chats</span>
            </li>

            {/* Docs */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <MdDescription className="text-xl" />
              <span>Docs</span>
            </li>

            {/* Settings */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <MdSettings className="text-xl" />
              <span>Settings</span>
            </li>

            {/* Logout */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <MdPerson className="text-xl" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
