"use client";
import axiosInstance from "@/lib/axios";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiX, FiCheck } from "react-icons/fi";

interface IExperience {
  _id: string;
  title: string;
  role: string;
  icon: string;
  period: string;
  location: string;
  type: string;
  description: string;
  details: string[];
  achievements: string;
  stats: { [key: string]: string };
}

const ExperienceAdmin = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<IExperience>>({
    title: "",
    role: "",
    icon: "",
    period: "",
    location: "",
    type: "",
    description: "",
    details: [""],
    achievements: "",
    stats: {},
  });
  const [newStatKey, setNewStatKey] = useState("");
  const [newStatValue, setNewStatValue] = useState("");

  const fetchExperiences = async () => {
    try {
      const response = await axiosInstance.get("/experiences");
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  React.useEffect(() => {
    fetchExperiences();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...(formData.details || [])];
    newDetails[index] = value;
    setFormData((prev) => ({ ...prev, details: newDetails }));
  };

  const addDetailField = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...(prev.details || []), ""],
    }));
  };

  const removeDetailField = (index: number) => {
    const newDetails = [...(formData.details || [])];
    newDetails.splice(index, 1);
    setFormData((prev) => ({ ...prev, details: newDetails }));
  };

  const addStat = () => {
    if (newStatKey && newStatValue) {
      setFormData((prev) => ({
        ...prev,
        stats: { ...prev.stats, [newStatKey]: newStatValue },
      }));
      setNewStatKey("");
      setNewStatValue("");
    }
  };

  const removeStat = (key: string) => {
    const newStats = { ...formData.stats };
    delete newStats[key];
    setFormData((prev) => ({ ...prev, stats: newStats }));
  };

  const startEditing = (experience: IExperience) => {
    setIsEditing(experience._id);
    setFormData({
      ...experience,
      details: [...experience.details],
      stats: { ...experience.stats },
    });
  };

  const startCreating = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      role: "",
      icon: "",
      period: "",
      location: "",
      type: "",
      description: "",
      details: [""],
      achievements: "",
      stats: {},
    });
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      title: "",
      role: "",
      icon: "",
      period: "",
      location: "",
      type: "",
      description: "",
      details: [""],
      achievements: "",
      stats: {},
    });
  };

  const submitForm = async () => {
    try {
      if (isCreating) {
        await axiosInstance.post("/experiences", formData);
      } else if (isEditing) {
        await axiosInstance.put(`/experiences/${isEditing}`, {
          _id: isEditing,
          ...formData,
        });
      }
      fetchExperiences();
      cancelEditing();
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await axiosInstance.delete(`/experiences/${id}`);
      fetchExperiences();
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Experiences Management
        </h1>
        <button
          onClick={startCreating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" /> Add New Experience
        </button>
      </div>

      {(isEditing || isCreating) && (
        <div className=" rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isCreating ? "Create New Experience" : "Edit Experience"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <input
                type="text"
                name="period"
                value={formData.period || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            {(formData.details || []).map((detail, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                />
                <button
                  onClick={() => removeDetailField(index)}
                  className="ml-2 p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                >
                  <FiX />
                </button>
              </div>
            ))}
            <button
              onClick={addDetailField}
              className="mt-2 p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center"
            >
              <FiPlus className="mr-1" /> Add Detail
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Achievements
            </label>
            <textarea
              name="achievements"
              value={formData.achievements || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stats
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder="Stat key"
                value={newStatKey}
                onChange={(e) => setNewStatKey(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Stat value"
                value={newStatValue}
                onChange={(e) => setNewStatValue(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
            <button
              onClick={addStat}
              className="mb-4 p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center"
            >
              <FiPlus className="mr-1" /> Add Stat
            </button>

            {formData.stats &&
              Object.entries(formData.stats).map(([key, value]) => (
                <div key={key} className="flex items-center mb-2">
                  <span className="font-medium mr-2">{key}:</span>
                  <span className="flex-1">{value}</span>
                  <button
                    onClick={() => removeStat(key)}
                    className="p-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={cancelEditing}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={submitForm}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <FiCheck className="mr-2" /> Save
            </button>
          </div>
        </div>
      )}

      {experiences.length === 0 && !isCreating ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No experiences found. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {experiences.map((experience) => (
                  <tr key={experience._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-white">
                        {experience.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{experience.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{experience.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEditing(experience)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => deleteExperience(experience._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceAdmin;
