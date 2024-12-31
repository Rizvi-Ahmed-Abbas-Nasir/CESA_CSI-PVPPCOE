"use client";
import { MdHome, MdAddCircleOutline, MdVisibility, MdChat, MdDescription, MdSettings, MdPerson } from "react-icons/md"; 
import abbas from "../../../Assets/IMG/person.png";
import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from 'axios'; 

export default function NavBar() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      }
      finally{
        setLoading(false); 

      }
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session && session.user) {
      fetchStudentData();
    }
  }, [session, status]);  
  

  return (
    <div className="w-[95%] h-[97vh] flex rounded-xl items-center justify-start bg-blue-700">
      <div className="w-full h-full flex flex-col p-4">

      <div className="w-full flex flex-col items-center justify-center py-6">
  {/* Image Loading Animation */}
  <div className="w-[8rem] h-[8rem] relative">
    {loading && (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="spinner ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
      </div>
    )}
    <Image
      src={studentData.image || abbas}
      width={128} // Corresponds to 8rem
      height={128} // Corresponds to 8rem
      className={`w-full h-full rounded-full ${loading ? 'opacity-0' : 'opacity-100'}`}
      alt="Student Image"
    />
  </div>

  <h4 className="text-white text-[1.2rem] font-semibold mt-3 text-center">
    {studentData.name.split(" ").slice(0, 2).join(" ")}
  </h4>
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
              <Link
                  href="/Project"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-blue-500 text-[1.2rem] p-2 rounded'
                      : 'text-[1.2rem] hover:bg-blue-500 p-2 rounded'
                  }
                  end
                >
                  Add Project
                </Link>
            </li>

            {/* Docs */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <MdDescription className="text-xl" />
              <Link
                  href="/ViewProjects"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-blue-500 text-[1.2rem] p-2 rounded'
                      : 'text-[1.2rem] hover:bg-blue-500 p-2 rounded'
                  }
                  end
                >
                  View Projects
                </Link>
            </li>

            {/* Settings */}
            <li className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800 bg-opacity-10 hover:bg-white hover:bg-opacity-20 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
              <MdSettings className="text-xl" />
              <Link
                  href="/chats"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-blue-500 text-[1.2rem] p-2 rounded'
                      : 'text-[1.2rem] hover:bg-blue-500 p-2 rounded'
                  }
                  end
                >
                  Chats
                </Link>
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
