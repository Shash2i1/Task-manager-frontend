import React, { useState, useEffect } from 'react';
import TaskFeatures from '../ApiUtils/Task';
import MoonLoader from "react-spinners/MoonLoader";

function EditTaskForm({ isModalOpen, taskId, taskDetails, closeModal }) {
    const [updatedTaskDetails, setUpdatedTask] = useState(taskDetails || "");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setUpdatedTask(taskDetails || ""); 
    }, [taskDetails]);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await TaskFeatures.updatetask({ taskId, taskDetails: updatedTaskDetails });
            closeModal(); // Close modal & refresh tasks after update
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isModalOpen) return null; // Prevent rendering when modal is closed

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-[500px]">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
                    ✖
                </button>

                <h1 className="text-xl font-bold text-red-600 text-center">Edit Task</h1>

                <form onSubmit={handleEdit} className="flex flex-col my-4">
                    <textarea 
                        name="taskDetails" 
                        value={updatedTaskDetails} 
                        onChange={(e) => setUpdatedTask(e.target.value)} 
                        className="w-full p-4 rounded-xl border border-gray-300 my-4"
                        placeholder="Type Task"
                        required
                    ></textarea>

                    <button 
                        type="submit" 
                        className={`bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-800 flex items-center justify-center ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? <MoonLoader size={20} color="white" /> : "Update Task"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditTaskForm;
