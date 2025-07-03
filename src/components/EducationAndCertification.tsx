import React from "react";
import { Timeline } from "@/components/ui/timeline";

interface EducationAndCertificationData {
  title: string;
  description: string;
  images: { src: string; alt?: string }[];
}

const getEducationAndCertifications = async (): Promise<
  EducationAndCertificationData[]
> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/educationAndCertification`,
    {
      cache: "no-store", // or 'force-cache' if the data doesn't change often
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch education and certifications");
  }

  return res.json();
};

export default async function EducationAndCertification() {
  const data = await getEducationAndCertifications();
  // console.log(data)
  return (
    <div id="journey" className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
