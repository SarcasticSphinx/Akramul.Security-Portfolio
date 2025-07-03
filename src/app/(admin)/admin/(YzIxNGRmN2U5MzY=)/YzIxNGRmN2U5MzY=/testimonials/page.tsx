"use client";
import axiosInstance from "@/lib/axios";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiCheck, FiUser } from "react-icons/fi";

interface ITestimonial {
  _id: string;
  testimonialId: number;
  name: string;
  testimonial: string;
  company: string;
  profilePic: string;
}

const TestimonialAdmin = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<ITestimonial>>({
    testimonialId: 0,
    name: "",
    testimonial: "",
    company: "",
    profilePic: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      const response = await axiosInstance.get("/testimonials");
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  React.useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "testimonialId" ? Number(value) : value,
    }));
  };

  const startEditing = (testimonial: ITestimonial) => {
    setIsEditing(testimonial._id);
    setFormData({
      ...testimonial,
    });
    if (testimonial.profilePic) {
      setImagePreview(testimonial.profilePic);
    }
  };

  const startCreating = () => {
    setIsCreating(true);
    setFormData({
      testimonialId: 0,
      name: "",
      testimonial: "",
      company: "",
      profilePic: "",
    });
    setImagePreview(null);
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      testimonialId: 0,
      name: "",
      testimonial: "",
      company: "",
      profilePic: "",
    });
    setImagePreview(null);
  };

  const submitForm = async () => {
    try {
      if (isCreating) {
        await axiosInstance.post("/testimonials", formData);
      } else if (isEditing) {
        await axiosInstance.put(`/testimonials/${isEditing}`, formData);
      }
      fetchTestimonials();
      cancelEditing();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await axiosInstance.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Testimonials Management
        </h1>
        <button
          onClick={startCreating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" /> Add New Testimonial
        </button>
      </div>

      {(isEditing || isCreating) && (
        <div className="rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isCreating ? "Create New Testimonial" : "Edit Testimonial"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial ID
                </label>
                <input
                  type="number"
                  name="testimonialId"
                  value={formData.testimonialId || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  {imagePreview ? (
                    <img
                      src={formData.profilePic || ""}
                      alt="Profile preview"
                      className="object-cover size-14 rounded-full"
                    />
                  ) : (
                    <FiUser className="text-gray-400 text-2xl" />
                  )}

                  <input
                    type="text"
                    name="profilePic"
                    placeholder="Enter your image URL"
                    value={formData.profilePic || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Testimonial
            </label>
            <textarea
              name="testimonial"
              value={formData.testimonial || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={4}
              required
            />
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
              disabled={!formData.name || !formData.testimonial}
            >
              <FiCheck className="mr-2" /> Save
            </button>
          </div>
        </div>
      )}

      {testimonials.length === 0 && !isCreating ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No testimonials found. Create one to get started.
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
                    Person
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Testimonial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {testimonials.map((testimonial) => (
                  <tr key={testimonial._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-white">
                        {testimonial.testimonialId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {testimonial.profilePic ? (
                            <img
                              src={testimonial.profilePic}
                              alt={testimonial.name}
                              className="rounded-full object-cover size-10"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <FiUser className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {testimonial.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 line-clamp-2">
                        {testimonial.testimonial}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {testimonial.company}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEditing(testimonial)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => deleteTestimonial(testimonial._id)}
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

export default TestimonialAdmin;
