import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Task from "../ApiUtils/Task";
import TaskFeatures from "../ApiUtils/Task";
import { useNavigate } from "react-router-dom";
import EditTaskForm from "./EditTaskForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

function Dashboard() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [tasks, setTasks] = useState([]);
  const [taskOpt, setTaskOpt] = useState({
    isEdit: false,
    taskId: "",
    taskDetails: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await Task.fetchTasks();
      setTasks(tasks.data.data[0]?.usertasks || []);
    } catch (error) {
      toast.error("Error fetching tasks! ");
      console.log("Error while fetching tasks");
    }
  };

  // Handle task update and refresh list
  const handleTaskUpdate = () => {
    fetchTasks(); // Refresh task list
    closeModal();
    toast.success("Task Updated Successfully ");
  };

  const deleteTask = async (taskId) => {
    try {
      await TaskFeatures.deleteTask({ taskId });
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("Task Deleted Successfully ");
    } catch (error) {
      toast.error("Error deleting task! ");
      console.log(error);
    }
  };

  const navigateToAddTask = () => {
    navigate("/add-task");
    toast.info("Redirecting to Add Task ");
  };

  const handleEdit = (taskId, taskDetails) => {
    setTaskOpt({
      isEdit: true,
      taskId: taskId,
      taskDetails: taskDetails,
    });
  };

  const closeModal = () => {
    setTaskOpt({
      isEdit: false,
      taskId: "",
      taskDetails: "",
    });
  };

  return (
    <div className="flex w-full h-full flex-col justify-center items-center relative">
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Edit Modal Overlay */}
      {taskOpt.isEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
              ✖
            </button>
            <EditTaskForm 
              isModalOpen={taskOpt.isEdit} 
              taskId={taskOpt.taskId} 
              taskDetails={taskOpt.taskDetails} 
              closeModal={handleTaskUpdate} 
            />
          </div>
        </div>
      )}

      <h3 className="text-green-500">Welcome {userData?.data?.userName}</h3>
      <div className="my-4 flex justify-end items-center">
        <button type="button" onClick={navigateToAddTask} className="bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-800">
          + Add Task
        </button>
      </div>
      <h2 className="text-xl font-bold">Your Tasks</h2>

      <div className="flex flex-col w-full h-full justify-center items-center overflow-y-scroll">
        {tasks.length > 0 ? (
          <ul className="flex h-full gap-4 flex-col w-full justify-center items-center">
            {tasks.map((task) => (
              <li key={task._id} className="w-[400px] shadow-xl flex p-4 bg-red-300 justify-between">
                <p>{task.taskDetails}</p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => handleEdit(task._id, task.taskDetails)} className="bg-green-600 px-4 py-2 rounded-xl text-white hover:bg-green-800">
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteTask(task._id)} className="bg-red-600 px-4 py-2 rounded-xl text-white hover:bg-red-800">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No tasks found</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
