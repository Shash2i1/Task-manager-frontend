import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskFeatures from '../ApiUtils/Task';
import { useNavigate } from 'react-router-dom';

function TaskForm({ isModalOpen, closeModal }) {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);
    const [task, setTask] = useState({
        taskDetails: "",
        userId: userData.data?._id
    });

    // Add task method
    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await TaskFeatures.addTask(task);
            closeModal(); // Close modal after adding task
            navigate("/dashboard")
        } catch (error) {
            console.log(error);
        }
    };

    if (!isModalOpen) return null; // Prevent rendering when modal is closed

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-[500px]">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
                    ✖
                </button>

                <h1 className="text-xl font-bold text-red-600 text-center">Add Task</h1>

                <form onSubmit={handleAddTask} className="flex flex-col my-4">
                    <textarea
                        name="taskDetails"
                        onChange={(e) => setTask((prev) => ({ ...prev, taskDetails: e.target.value }))}
                        placeholder="Type Task"
                        className="w-full p-4 rounded-xl border border-gray-300 my-4"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-800"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
