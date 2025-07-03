"use client";
import axiosInstance from "@/lib/axios";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiX, FiCheck } from "react-icons/fi";

interface IService {
  _id: string;
  serviceId: number;
  title: string;
  availability: string;
  content: string;
  category: string;
  icon: string;
  relatedIds: string[];
  status: string;
  confidence: number;
}

const ServiceAdmin = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<IService>>({
    serviceId: 0,
    title: "",
    availability: "",
    content: "",
    category: "",
    icon: "",
    relatedIds: [],
    status: "",
    confidence: 0,
  });
  const [newRelatedId, setNewRelatedId] = useState("");

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get("/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "serviceId" || name === "confidence" ? Number(value) : value,
    }));
  };

  const addRelatedId = () => {
    if (newRelatedId) {
      setFormData((prev) => ({
        ...prev,
        relatedIds: [...(prev.relatedIds || []), newRelatedId],
      }));
      setNewRelatedId("");
    }
  };

  const removeRelatedId = (index: number) => {
    const newRelatedIds = [...(formData.relatedIds || [])];
    newRelatedIds.splice(index, 1);
    setFormData((prev) => ({ ...prev, relatedIds: newRelatedIds }));
  };

  const startEditing = (service: IService) => {
    setIsEditing(service._id);
    setFormData({
      ...service,
      relatedIds: [...service.relatedIds],
    });
  };

  const startCreating = () => {
    setIsCreating(true);
    setFormData({
      serviceId: 0,
      title: "",
      availability: "",
      content: "",
      category: "",
      icon: "",
      relatedIds: [],
      status: "",
      confidence: 0,
    });
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      serviceId: 0,
      title: "",
      availability: "",
      content: "",
      category: "",
      icon: "",
      relatedIds: [],
      status: "",
      confidence: 0,
    });
  };

  const submitForm = async () => {
    try {
      if (isCreating) {
        await axiosInstance.post("/services", formData);
      } else if (isEditing) {
        await axiosInstance.put(`/services/${isEditing}`, formData);
      }
      fetchServices();
      cancelEditing();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await axiosInstance.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Services Management
        </h1>
        <button
          onClick={startCreating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" /> Add New Service
        </button>
      </div>

      {(isEditing || isCreating) && (
        <div className="rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isCreating ? "Create New Service" : "Edit Service"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service ID
              </label>
              <input
                type="number"
                name="serviceId"
                value={formData.serviceId || 0}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
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
                Availability
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category || ""}
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
                Status
              </label>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confidence
              </label>
              <input
                type="number"
                name="confidence"
                min="0"
                max="100"
                value={formData.confidence || 0}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Related IDs
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Add related ID"
                value={newRelatedId}
                onChange={(e) => setNewRelatedId(e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <button
                onClick={addRelatedId}
                className="ml-2 p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
              >
                <FiPlus />
              </button>
            </div>
            <div className="space-y-2">
              {(formData.relatedIds || []).map((id, index) => (
                <div key={index} className="flex items-center">
                  <span className="p-2 bg-gray-100 rounded-md flex-1">
                    {id}
                  </span>
                  <button
                    onClick={() => removeRelatedId(index)}
                    className="ml-2 p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
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

      {services.length === 0 && !isCreating ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No services found. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">
                        {service.serviceId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className=" text-white font-medium">
                        {service.title}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {service.availability}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{service.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          service.status === "active"
                            ? "bg-green-100 text-green-800"
                            : service.status === "inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              service.confidence > 75
                                ? "bg-green-600"
                                : service.confidence > 50
                                ? "bg-yellow-500"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${service.confidence}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-white">
                          {service.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEditing(service)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => deleteService(service._id)}
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

export default ServiceAdmin;
