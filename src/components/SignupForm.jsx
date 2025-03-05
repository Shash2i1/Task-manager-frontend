import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../ApiUtils/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are imported

export default function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value, // Dynamically update the correct field
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevents form from reloading the page
    setError("");

    if (!data.userName || !data.email || !data.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await User.registerUser(data);
      if (response) {
        toast.success("User Registered Successfully 🎉");
        setTimeout(() => navigate("/login"), 2000); // Redirect after a short delay
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-80 h-auto bg-green-300 rounded-lg shadow-lg">
      <h1 className="text-center py-4 text-lg font-bold text-blue-400">Sign Up</h1>
      
      <form onSubmit={handleSignup} className="flex flex-col pt-2 gap-4">
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          className="p-2 rounded-lg mx-4"
          onChange={handleChange}
          value={data.userName}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 rounded-lg mx-4"
          onChange={handleChange}
          value={data.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 rounded-lg mx-4"
          onChange={handleChange}
          value={data.password}
        />
        <p className="text-end pr-2">
          Already have an account? <Link to="/login" className="text-blue-600">Click here</Link>
        </p>
        <button
          type="submit"
          disabled={!data.userName || !data.email || !data.password}
          className={`p-2 rounded-lg m-4 text-white ${
            !data.userName || !data.email || !data.password
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-800"
          }`}
        >
          Register
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
