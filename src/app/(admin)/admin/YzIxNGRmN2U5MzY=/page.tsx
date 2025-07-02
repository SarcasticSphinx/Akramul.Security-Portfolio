// "use client";

// import ExperienceSection from "@/components/ExperienceSection";
// import Testimonials from "@/components/Testimonials";
// import ServicesSection from "@/components/ServicesSection";
// import axiosInstance from "@/lib/axios";
// import React, { useEffect, useState } from "react";

// interface Experience {
//   _id: string;
//   icon: string;
//   title: string;
//   role: string;
//   description: string;
// }

// interface Service {
//   _id: string;
//   icon: string;
//   name: string;
//   description: string;
// }

// interface Testimonial {
//   _id: string;
//   author: string;
//   content: string;
//   designation: string;
//   image: string;
// }

// interface Article {
//   _id: string;
//   title: string;
//   content: string;
// }

// interface DashboardData {
//   experiences: Experience[];
//   services: Service[];
//   articles: Article[];
//   testimonials: Testimonial[];
// }

// const Page: React.FC = () => {
//   const [editMode, setEditMode] = useState<boolean>(false);
//   const [activeTab, setActiveTab] = useState<keyof DashboardData>("experiences");

//   const [data, setData] = useState<DashboardData>({
//     experiences: [],
//     services: [],
//     articles: [],
//     testimonials: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [experiencesRes, servicesRes, articlesRes, testimonialsRes] =
//           await Promise.all([
//             axiosInstance.get<Experience[]>("/experiences"),
//             axiosInstance.get<Service[]>("/services"),
//             axiosInstance.get<Article[]>("/articles"),
//             axiosInstance.get<Testimonial[]>("/testimonials"),
//           ]);

//         setData({
//           experiences: experiencesRes.data,
//           services: servicesRes.data,
//           articles: articlesRes.data,
//           testimonials: testimonialsRes.data,
//         });
//       } catch (err) {
//         console.error("Failed to fetch dashboard data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSave = (): void => {
//     setEditMode(false);
//     // TODO: Send `data` to your backend to save changes
//     console.log("Content to save:", data);
//   };

//   const renderContent = (): React.ReactNode => {
//     switch (activeTab) {
//       case "testimonials":
//         return (
//           <Testimonials
//             data={data.testimonials}
//             editMode={editMode}
//             setData={(updated: Testimonial[]) =>
//               setData((prev) => ({ ...prev, testimonials: updated }))
//             }
//           />
//         );
//       case "experiences":
//         return (
//           <ExperienceSection
//             data={data.experiences}
//             editMode={editMode}
//             setData={(updated: Experience[]) =>
//               setData((prev) => ({ ...prev, experiences: updated }))
//             }
//           />
//         );
//       case "services":
//         return (
//           <ServicesSection
//             data={data.services}
//             editMode={editMode}
//             setData={(updated: Service[]) =>
//               setData((prev) => ({ ...prev, services: updated }))
//             }
//           />
//         );
//       case "articles":
//         return <div>Articles Section (To be implemented)</div>;
//       default:
//         return null;
//     }
//   };

//   // Optional: add simple tab buttons with correct typing
//   const tabs: (keyof DashboardData)[] = [
//     "experiences",
//     "services",
//     "articles",
//     "testimonials",
//   ];

//   return (
//     <div className="min-h-screen px-4 lg:px-30 p-6">
//       <h1 className="text-3xl font-bold mb-8 text-blue-400">Admin Dashboard</h1>

//       <div className="mb-4 flex space-x-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded ${
//               activeTab === tab
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//             }`}
//             type="button"
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
//           {editMode ? (
//             <div className="space-x-2">
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
//                 type="button"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditMode(false)}
//                 className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
//                 type="button"
//               >
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={() => setEditMode(true)}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
//               type="button"
//             >
//               Edit
//             </button>
//           )}
//         </div>

//         {renderContent()}
//       </div>

//       <div className="mt-6 text-sm text-gray-400">
//         <p>Note: Changes will be reflected on the main site after saving.</p>
//       </div>
//     </div>
//   );
// };

// export default Page;


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page