"use client";
import Image from "next/image";
import { AiFillHome, AiFillAppstore, AiOutlineShoppingCart, AiOutlineLock, AiOutlineFileText, AiOutlineSetting, AiOutlineUser } from "react-icons/ai"; // Importing icons
import abbas from "../../../Assets/IMG/abbas.jpg";

export default function NavBar() {
  return (
    <div className="w-full h-[100vh] pl-2 flex items-center">
      <div className="w-[15%] h-[99%] rounded-xl bg-[#00042a]">
        <div className="w-full flex flex-col p-4">
          
          {/* Profile Section */}
          <div className="w-full flex py-3 justify-center b">
            <div>
              <Image src={abbas} className="w-20 h-20 rounded-full" alt="Rizvi Abbas" />
            </div>
            <div className="flex items-center pl-3">
              <h4 className="text-white text-[1.2rem] font-semibold">Rizvi Abbas</h4>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="w-full flex justify-center py-12 flex-col">
            <ul className="flex w-full flex-col text-white gap-4">
              
              {/* Pages */}
              <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 backdrop-blur-md border border-white/20 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
                <AiFillHome className="text-xl" />
                Pages
              </li>

              {/* Applications */}
              <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 backdrop-blur-md border border-white/20 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
                <AiFillAppstore className="text-xl" />
                Applications
              </li>

              {/* Ecommerce */}
              <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 backdrop-blur-md border border-white/20 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
                <AiOutlineShoppingCart className="text-xl" />
                Ecommerce
              </li>

              {/* Authentication */}
              <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 backdrop-blur-md border border-white/20 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
                <AiOutlineLock className="text-xl" />
                Authentication
              </li>

              {/* Docs */}
              <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 backdrop-blur-md border border-white/20 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
                <AiOutlineFileText className="text-xl" />
                Docs
              </li>

              {/* Settings */}
              <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 backdrop-blur-md border border-white/20 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
                <AiOutlineSetting className="text-xl" />
                Settings
              </li>

              {/* Logout */}
              <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 backdrop-blur-md border border-white/20 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
                <AiOutlineUser className="text-xl" />
                Logout
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
``