import axios from "axios"
const BACKEND_URL = String(import.meta.env.VITE_BACKEND_URL)
export class UserFunctions{

    //Method fro register user
    async registerUser({userName, email, password}){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/register`,{userName,email,password})
            return response.data
        } catch (error) {
            console.log("Error while registering || registerUser",error)
            throw error;
        }
    }

    //Method for login the user
    async loginUser({email, password}){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`,{email, password},{withCredentials:true});
            return response.data
        } catch (error) {
            console.log("ERROR while loging|| loginuser",error)
            throw error;
        }
    }

    //method to get current user details
    async getCurrentUser(){
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/get-current-user`,{withCredentials:true})
            return response.data;
        } catch (error) {
            console.log("Error While fetching user|| getCurrentUser",error)
        }
    }

    //method to logout the user
    async logoutUser(){
        try {
            await axios.post(`${BACKEND_URL}/api/v1/user/logout`);
        } catch (error) {
            console.log("Error while logout user|| logoutUser",error);
        }
    }

}

const userFeature = new UserFunctions();
export default userFeature