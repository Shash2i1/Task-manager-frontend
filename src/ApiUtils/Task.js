import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

class TaskFunctions{
    //method to add Task
    async addTask({userId,taskDetails}){
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/user/add-task`,{userId, taskDetails});
            return response.data
        } catch (error) {
            console.log("Error while adding task",error);
        }
    }

    //method to update task
    async updatetask({taskId,taskDetails}){
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/user/update-task`,{taskId,taskDetails});
            return response.data;
        } catch (error) {
            console.log("Error while updating task|| updateTask", error)
        }
    }

    //method to delet task
    async deleteTask({taskId}){
        try {
            await axios.post(`${API_BASE_URL}/api/v1/user/delete-task`,{taskId})
        } catch (error) {
            console.log("Error while deleting task",error);
        }
    }

    //method to fetch all tasks of user
    async fetchTasks(){
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/user/fetch-tasks`);
            return response
        } catch (error) {
            console.log("Error while fetching user Tasks", error);
        }
    }
}

const TaskFeatures = new TaskFunctions();
export default TaskFeatures;