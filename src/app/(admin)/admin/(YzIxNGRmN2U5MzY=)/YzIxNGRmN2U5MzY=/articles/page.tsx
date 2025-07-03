"use client";
import axiosInstance from "@/lib/axios";
import React, { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiCheck,
  FiImage,
  FiLink,
} from "react-icons/fi";
import Image from "next/image";

interface IImage {
  src: string;
  alt: string;
}

interface IArticle {
  _id: string;
  title: string;
  description: string;
  image: IImage;
  icon?: string;
  link: string;
}

const ArticleAdmin = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<IArticle>>({
    title: "",
    description: "",
    image: { src: "", alt: "" },
    icon: "",
    link: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      const response = await axiosInstance.get("/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  React.useEffect(() => {
    fetchArticles();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (field: keyof IImage, value: string) => {
    setFormData((prev) => ({
      ...prev,
      image: {
        src: prev.image?.src ?? "",
        alt: prev.image?.alt ?? "",
        [field]: value,
      },
    }));
  };


  const startEditing = (article: IArticle) => {
    setIsEditing(article._id);
    setFormData({
      ...article,
      image: { ...article.image },
    });
    setImagePreview(article.image.src);
  };

  const startCreating = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      description: "",
      image: { src: "", alt: "" },
      icon: "",
      link: "",
    });
    setImagePreview(null);
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      title: "",
      description: "",
      image: { src: "", alt: "" },
      icon: "",
      link: "",
    });
    setImagePreview(null);
  };

  const submitForm = async () => {
    try {
      if (isCreating) {
        await axiosInstance.post("/articles", formData);
      } else if (isEditing) {
        await axiosInstance.put(`/articles/${isEditing}`, formData);
      }
      fetchArticles();
      cancelEditing();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await axiosInstance.delete(`/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Articles Management
        </h1>
        <button
          onClick={startCreating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" /> Add New Article
        </button>
      </div>

      {(isEditing || isCreating) && (
        <div className="rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isCreating ? "Create New Article" : "Edit Article"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  Link*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="link"
                    value={formData.link || ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border rounded-md"
                    required
                  />
                </div>
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
                  placeholder="e.g., 'newspaper'"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image*
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {imagePreview ? (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={formData.image?.src || imagePreview}
                        alt={formData.image?.alt || "Preview"}
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400 mb-4">
                      <FiImage className="text-4xl mb-2" />
                      <p>Image preview</p>
                    </div>
                  )}

                  <label className="cursor-pointer">
                    <input
                      type="text"
                      name="imageSrc"
                      placeholder="Image URL"
                      onChange={(e) => handleImageChange("src", e.target.value)}
                      className="border rounded-xl p-2 w-full "
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image Alt Text*
                </label>
                <input
                  type="text"
                  value={formData.image?.alt || ""}
                  onChange={(e) => handleImageChange("alt", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
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
              disabled={
                !formData.title ||
                !formData.description ||
                !formData.link ||
                !formData.image?.src ||
                !formData.image?.alt
              }
            >
              <FiCheck className="mr-2" /> Save
            </button>
          </div>
        </div>
      )}

      {articles.length === 0 && !isCreating ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No articles found. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-16 w-16">
                        {article.image.src ? (
                          <Image
                            src={article.image.src}
                            alt={article.image.alt}
                            fill
                            className="object-cover rounded-md"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 rounded-md flex items-center justify-center">
                            <FiImage className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">
                        {article.title}
                      </div>
                      {article.icon && (
                        <div className="text-sm text-gray-300 mt-1">
                          <span className="inline-flex items-center">
                            <span className="mr-1">{article.icon}</span>
                            Icon
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 line-clamp-2">
                        {article.description}
                      </div>
                      <div className="text-xs text-blue-600 mt-1 ">
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.link}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEditing(article)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => deleteArticle(article._id)}
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

export default ArticleAdmin;
