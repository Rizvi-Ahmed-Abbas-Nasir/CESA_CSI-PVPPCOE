"use client";

import { FaArrowRight, FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa"; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Navbar";
import toast from "react-hot-toast";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import StudentProgressChart from "./components/charts"
import ProfileWithCharts from "./components/CircularGraph"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const AdminPanel = () => {
    
  
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    // Fetch dummy users data
    const fetchUsers = async () => {
      try {
        const dummyUsers = [
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            role: "Admin",
            status: "Active",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "User",
            status: "Inactive",
          },
          {
            id: 3,
            name: "Robert Brown",
            email: "robert.brown@example.com",
            role: "Moderator",
            status: "Active",
          },
        ];
        setUsers(dummyUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Fetch events data
    const fetchEvents = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

      try {
        const response = await axios.get("https://cesa-csi-pvppcoe.vercel.app/api/gallery", {
          headers: {
            Authorization: API_KEY,
          },
        });
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Fetch dummy student data
    const fetchStudentData = async () => {
      try {
        const dummyStudents = [
          {
            id: 101,
            name: "Alice Johnson",
            progress: 75,
          },
          {
            id: 102,
            name: "Bob Smith",
            progress: 60,
          },
          {
            id: 103,
            name: "Charlie Lee",
            progress: 90,
          },
        ];
        setStudentData(dummyStudents);
      } catch (err) {
        console.error("Error fetching student data:", err);
      }
    };

    fetchStudentData();
  }, []);

  // Sales Data for Chart
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales 2022",
        data: [1200, 1900, 3000, 2500, 2800, 3500, 4100, 4300, 2000, 3000, 3900, 4500],
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "#6366F1",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} sales`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value) => `$${value / 1000}k`,
        },
      },
    },
  };

  return (
    <>
      <div className="flex w-full h-[100vh] xl:flex-row flex-col">
        <NavBar />
        <div className="flex gap-3 h-full w-full flex-col overflow-y-scroll bg-[#141414] py-9 pr-8 pl-5">
          {/* Search Bar */}
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

          {/* Sales Chart */}
          <div className="p-10 rounded-xl bg-[#202020] shadow-lg w-full mb-6">
            <h3 className="text-white text-lg font-bold mb-4">Sales 2022</h3>
            <div className="text-white text-sm mb-4 flex justify-between">
              <p>
                <span className="text-2xl font-bold">$12.7k</span> <span className="text-green-500">+1.3%</span> vs last year
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-200 rounded-md text-black text-sm">Daily</button>
                <button className="px-3 py-1 bg-gray-200 rounded-md text-black text-sm">Weekly</button>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">Annually</button>
              </div>
            </div>
            <Line data={salesData} options={chartOptions} />
          </div>

          {/* Users Table */}
          <div className="p-10 rounded-[1rem] bg-[#1b1b1b] shadow-lg w-full">
            <div className="overflow-x-auto flex flex-col gap-5 pb-[4rem] ">
            <div className="flex w-full gap-6 justify-around">
  <div className="table w-[70%] text-white rounded-[1rem] overflow-hidden"> {/* Added rounded and overflow-hidden */}
    <div className="table-header-group bg-[#202020] rounded-t-[1rem]"> {/* Rounded top corners */}
      <div className="table-row">
        <div className="table-cell px-4 py-2 border border-[#303030] font-bold">ID</div>
        <div className="table-cell px-4 py-2 border border-[#303030] font-bold">Name</div>
        <div className="table-cell px-4 py-2 border border-[#303030] font-bold">Email</div>
        <div className="table-cell px-4 py-2 border border-[#303030] font-bold">Role</div>
        <div className="table-cell px-4 py-2 border border-[#303030] font-bold">Status</div>
        <div className="table-cell px-4 py-2 border border-[#303030] font-bold">Actions</div>
      </div>
    </div>
    <div className="table-row-group">
      {users.map((user) => (
        <div key={user.id} className="table-row border-t border-[#303030]">
          <div className="table-cell px-4 py-2 border border-[#303030]">{user.id}</div>
          <div className="table-cell px-4 py-2 border border-[#303030]">{user.name}</div>
          <div className="table-cell px-4 py-2 border border-[#303030]">{user.email}</div>
          <div className="table-cell px-4 py-2 border border-[#303030]">{user.role}</div>
          <div className="table-cell px-4 py-2 border border-[#303030]">{user.status}</div>
          <div className="table-cell px-4 py-2 border border-[#303030]">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-xl mr-2"
              onClick={() => console.log(`Edit user ID: ${user.id}`)}
            >
              <FaEdit />
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl"
              onClick={() => console.log(`Delete user ID: ${user.id}`)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="mt-8 rounded-[1rem] overflow-hidden"> {/* Added rounded corners for the chart container */}
    <ProfileWithCharts studentData={studentData} />
  </div>
</div>

             
              <div className="flex flex-col items-center justify-center rounded-xl w-[100%] h-auto">
    <StudentProgressChart />
</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
