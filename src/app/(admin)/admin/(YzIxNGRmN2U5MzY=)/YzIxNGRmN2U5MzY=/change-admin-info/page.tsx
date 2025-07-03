"use client";
import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { FiEdit, FiSave, FiLock, FiMail } from "react-icons/fi";

interface AdminData {
  _id: string;
  email: string;
  password: string; // Note: In production, you should never expose passwords like this
}

const ChangeAdminInfo = () => {
  const [adminData, setAdminData] = useState<AdminData>({
    _id: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axiosInstance.get("/admin");
        if (response.data && response.data.length > 0) {
          setAdminData(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
        setError("Failed to load admin information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!adminData.email || !adminData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      await axiosInstance.put(`/admin`, {
        email: adminData.email,
        password: adminData.password,
      });
      setSuccess("Admin information updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update admin data:", error);
      setError("Failed to update admin information");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Admin Information
          </h1>
          {!isEditing ? (
            <button
              onClick={handleEditToggle}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FiEdit className="mr-2" /> Edit
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={adminData.email}
                onChange={handleInputChange}
                className={`pl-10 w-full p-2 border rounded-md ${
                  isEditing ? "" : "bg-gray-700"
                }`}
                disabled={!isEditing}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type={isEditing ? "text" : "password"}
                name="password"
                value={adminData.password}
                onChange={handleInputChange}
                className={`pl-10 w-full p-2 border rounded-md ${
                  isEditing ? "" : "bg-gray-700"
                }`}
                disabled={!isEditing}
                required
              />
            </div>
            {!isEditing && (
              <p className="mt-1 text-xs text-gray-500">
                For security reasons, the password is hidden
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FiSave className="mr-2" /> Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangeAdminInfo;
