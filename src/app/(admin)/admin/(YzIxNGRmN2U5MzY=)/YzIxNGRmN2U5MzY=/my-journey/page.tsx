"use client";
import axiosInstance from "@/lib/axios";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiX, FiCheck } from "react-icons/fi";

interface IImage {
  src: string;
  alt: string;
}

interface IJourney {
  _id: string;
  title: string;
  description: string;
  images: IImage[];
}

const EducationAndCertificationPage = () => {
  const [journey, setJourney] = useState<IJourney[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<IJourney>>({
    title: "",
    description: "",
    images: [],
  });
  const [newImage, setNewImage] = useState<IImage>({ src: "", alt: "" });

  const fetchJourney = async () => {
    try {
      const response = await axiosInstance.get("/educationAndCertification");
      setJourney(response.data);
    } catch (error) {
      console.error("Error fetching education & certifications:", error);
    }
  };

  React.useEffect(() => {
    fetchJourney();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewImage((prev) => ({ ...prev, [name]: value }));
  };

  const addImage = () => {
    if (newImage.src && newImage.alt) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), newImage],
      }));
      setNewImage({ src: "", alt: "" });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const startEditing = (item: IJourney) => {
    setIsEditing(item._id);
    setFormData({
      ...item,
      images: [...item.images],
    });
  };

  const startCreating = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      description: "",
      images: [],
    });
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      title: "",
      description: "",
      images: [],
    });
  };

  const submitForm = async () => {
    try {
      if (isCreating) {
        await axiosInstance.post("/educationAndCertification", formData);
      } else if (isEditing) {
        await axiosInstance.put(
          `/educationAndCertification/${isEditing}`,
          formData
        );
      }
      fetchJourney();
      cancelEditing();
    } catch (error) {
      console.error("Error saving education/certification:", error);
    }
  };

  const deleteJourney = async (id: string) => {
    try {
      await axiosInstance.delete(`/education-certifications/${id}`);
      fetchJourney();
    } catch (error) {
      console.error("Error deleting education/certification:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Education & Certifications
        </h1>
        <button
          onClick={startCreating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" /> Add New
        </button>
      </div>

      {(isEditing || isCreating) && (
        <div className=" rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isCreating
              ? "Add New Education/Certification"
              : "Edit Education/Certification"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {(formData.images || []).map((image, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="relative h-40 w-full mb-2">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-contain w-full h-full rounded-md"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm truncate">{image.alt}</span>
                      <button
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Add New Image
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Image URL*
                    </label>
                    <input
                      type="text"
                      name="src"
                      value={newImage.src}
                      onChange={handleImageInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Alt Text*
                    </label>
                    <input
                      type="text"
                      name="alt"
                      value={newImage.alt}
                      onChange={handleImageInputChange}
                      placeholder="Description of image"
                      className="w-full p-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={addImage}
                  disabled={!newImage.src || !newImage.alt}
                  className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm flex items-center disabled:opacity-50"
                >
                  <FiPlus className="mr-1" /> Add Image
                </button>
              </div>
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
              disabled={!formData.title || !formData.description}
            >
              <FiCheck className="mr-2" /> Save
            </button>
          </div>
        </div>
      )}

      {journey.length === 0 && !isCreating ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No education/certification records found.
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
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Images
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {journey.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-lg text-gray-300">
                        {item.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white line-clamp-2">
                        {item.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {item.images.slice(0, 3).map((image, index) => (
                          <div key={index} className="relative h-10 w-10">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="object-cover rounded-md"
                            />
                          </div>
                        ))}
                        {item.images.length > 3 && (
                          <div className="relative h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-xs">
                            +{item.images.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEditing(item)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => deleteJourney(item._id)}
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

export default EducationAndCertificationPage;
