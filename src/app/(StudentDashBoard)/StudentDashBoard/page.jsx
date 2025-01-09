"use client";

import NavBar from "@/app/(StudentDashBoard)/Pages/NavBar";
import StudentHome from "../Pages/StudentHome";
import HeaderDash from "@/app/(StudentDashBoard)/Pages/HeaderDash";

export default function Home() {
  return (
    <div className="bg-white flex w-full h-[100vh]  justify-center items-center ">
      <div className="xl:w-[15%] w-[100%] hidden xl:flex justify-center">
        <NavBar />
      </div>
      
      <div className=" xl:w-[85%] w-[90%] h-[97vh] flex flex-col p-1 xl:pr-8">
        <div className="h-[8vh]">
          <HeaderDash />
        </div>
        
        <div className="h-[100vh] w-full  overflow-auto pt-4">
          <StudentHome />
        </div>
      </div>
    </div>
  );
}
