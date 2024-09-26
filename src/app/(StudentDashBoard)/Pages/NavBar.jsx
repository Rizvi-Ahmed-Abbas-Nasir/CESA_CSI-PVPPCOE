"use client";
import Image from "next/image";
import { AiFillHome, AiFillAppstore, AiOutlineShoppingCart, AiOutlineLock, AiOutlineFileText, AiOutlineSetting, AiOutlineUser } from "react-icons/ai"; // Importing icons
import abbas from "../../../Assets/IMG/abbas.jpg";

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
              <AiFillHome className="text-xl" />
              <span>Pages</span>
            </li>

            {/* Applications */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <AiFillAppstore className="text-xl" />
              <span>Applications</span>
            </li>

            {/* Ecommerce */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <AiOutlineShoppingCart className="text-xl" />
              <span>Ecommerce</span>
            </li>

            {/* Authentication */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <AiOutlineLock className="text-xl" />
              <span>Authentication</span>
            </li>

            {/* Docs */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <AiOutlineFileText className="text-xl" />
              <span>Docs</span>
            </li>

            {/* Settings */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <AiOutlineSetting className="text-xl" />
              <span>Settings</span>
            </li>

            {/* Logout */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <AiOutlineUser className="text-xl" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
