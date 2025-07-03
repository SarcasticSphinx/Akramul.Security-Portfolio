"use client";
import React from "react";
import { FiUpload, FiAlertTriangle, FiInfo } from "react-icons/fi";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your website content</p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to Your Admin Dashboard
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Hey Akram! 👋 I&apos;m glad to have you back. This is your
                command center for managing all website content.
              </p>

              <div className="p-4 bg-gray-700 rounded-md border-l-4 border-blue-500">
                <p className="font-medium text-gray-100">Quick Start Guide:</p>
                <ul className="mt-2 space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Use the navigation menu to access different content
                      sections
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Remember to host images externally using services like
                      ImgBB
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      All changes are saved automatically when editing content
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-400">
                Need help? Contact support at{" "}
                <a
                  href="mailto:suhailahmedtohax@gmail.com"
                  className="text-blue-400 hover:underline"
                >
                  suhailahmedtohax@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Image Hosting Instructions */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiUpload className="mr-2" /> Image Hosting Guide
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-900 text-blue-200 rounded-full p-2 mr-3">
                  <FiInfo size={16} />
                </div>
                <div>
                  <h3 className="font-medium">Using ImgBB for Image Hosting</h3>
                  <p className="text-sm text-gray-400">
                    All images must be hosted externally. We recommend using
                    ImgBB for free image hosting.
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 rounded-md p-4">
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Go to{" "}
                    <a
                      href="https://imgbb.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      imgbb.com
                    </a>
                  </li>
                  <li>Click &quot;Start Uploading&quot;</li>
                  <li>Select your image files</li>
                  <li>
                    Choose &quot;Don&apos;t auto delete&quot; in expiration
                  </li>
                  <li>Click &quot;Upload&quot;</li>
                  <li>Copy the &quot;Direct Link&quot; URL</li>
                  <li>Paste it in the image URL field in our admin panel</li>
                </ol>
              </div>

              <div className="flex items-start text-yellow-400">
                <div className="bg-yellow-900 text-yellow-200 rounded-full p-2 mr-3">
                  <FiAlertTriangle size={16} />
                </div>
                <div>
                  <h3 className="font-medium">Important Notes</h3>
                  <ul className="text-sm list-disc list-inside text-yellow-300 space-y-1 mt-1">
                    <li>Always add descriptive alt text for accessibility</li>
                    <li>Recommended image size: 800-1200px width</li>
                    <li>Use JPEG for photos, PNG for graphics</li>
                    <li>Keep file sizes under 1MB when possible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
