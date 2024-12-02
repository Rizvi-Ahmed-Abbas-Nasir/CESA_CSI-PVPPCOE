import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


const DeleteAlert = ({ message, onConfirm,  currentEventIndex, onCancel }) => {
  const [deleteLoading, setDeleteLoading] = useState(false); // Manage the loading state within the component

  const handleConfirmDelete = async () => {
    if (currentEventIndex !== null && !deleteLoading) {
      // Set delete loading to true to prevent multiple calls
      setDeleteLoading(true);

      try {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

        // Call your API to delete the event
        const response = await axios.delete(
          `http://localhost:3000/api/studentevent?_id=${currentEventIndex}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );

      
      } catch (error) {
        toast.error("Error Deleting")
        console.error("Error deleting event:", error.response?.data?.message || error.message);
      } finally {
        // Reset the delete loading state and close the alert
        setDeleteLoading(false);
        onCancel(); // Close the alert
        onConfirm()
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className={`py-2 px-4 rounded-lg text-white ${
              deleteLoading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={handleConfirmDelete}
            disabled={deleteLoading} // Disable the delete button while loading
          >
            {deleteLoading ? (
              <div className="flex items-center gap-2">
                {/* Circle Spinner */}
                <div className="spinner"></div>
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </button>
          <button
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={onCancel}
            disabled={deleteLoading} // Disable cancel button while loading
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
