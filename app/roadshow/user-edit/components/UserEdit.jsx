"use client";
import { userUserServices } from "@/services/userServices";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Card from "@/app/dashboard/components/ui/Card";
import Button from "@/app/dashboard/components/ui/Button";
import { Input } from "@/app/dashboard/components/ui/Field";

export default function UserEdit() {
  const { getUser, putUser } = userUserServices();
  const [addUser, setAddUser] = useState({
    _id: null,
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (response?.sucess && response?.data) {
          setAddUser({
            _id: response.data._id,
            email: response.data.email,
            password: "",
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

    setSaving(true);
    try {
      const formdata = new FormData();
      formdata.append("password", addUser.password);

      const response = await putUser(addUser._id, formdata);

      if (response?.sucess) {
        Swal.fire("Success", "Password updated successfully!", "success");
        setAddUser((prev) => ({ ...prev, password: "" }));
      } else {
        Swal.fire("Failed", "Failed to update password", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <h3 className="mb-6 text-center text-lg font-semibold text-[#1A2233]">
          Change Password
        </h3>

        {loading ? (
          <p className="text-center text-sm text-[#8791A1]">Loading user data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" value={addUser.email} readOnly className="cursor-not-allowed bg-[#F5F6F8]" />

            <div className="relative">
              <Input
                label="New Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={addUser.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="pr-10"
              />
              <span
                className="absolute right-3 top-[2.35rem] cursor-pointer text-[#8791A1] hover:text-[#4B5566]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <Button type="submit" className="w-full" loading={saving}>
              Update Password
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
