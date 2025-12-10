"use client";
import { userUserServices } from "@/services/userServices";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function UserEdit() {
  const { getUser, putUser } = userUserServices();
  const [addUser, setAddUser] = useState({
    _id: null,
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        console.log("Fetched user:", response.data);

        if (response?.sucess && response?.data) {
          setAddUser({
            _id: response.data._id,
            email: response.data.email,
            password: "", // keep blank
          });
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        Swal.fire("Error", "Failed to fetch user data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addUser.password) {
      Swal.fire("Warning", "Please enter a new password", "warning");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("password", addUser.password);

      const response = await putUser(addUser._id, formdata);

      if (response?.sucess) {
        Swal.fire("Success", "Password updated successfully!", "success");
        setAddUser((prev) => ({ ...prev, password: "" })); // reset password
      } else {
        Swal.fire("Failed", "Failed to update password", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1E1E1E] p-4 flex justify-center items-center min-h-screen">
        <p className="text-white text-center">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] p-4 flex justify-center items-center min-h-screen">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 w-96">
        <h3 className="text-white text-xl font-semibold mb-6 text-center">
          Change Password
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display authenticated email */}
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="text"
              value={addUser.email}
              readOnly
              className="w-full p-2 border rounded bg-gray-700 text-white cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-white mb-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={addUser.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full p-2 border rounded !bg-transparent text-white pr-10"
            />
            <span
              className="absolute right-3 top-[2.6rem] text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00A3FF] hover:bg-[#6A9F43] py-2 rounded text-white font-semibold"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
