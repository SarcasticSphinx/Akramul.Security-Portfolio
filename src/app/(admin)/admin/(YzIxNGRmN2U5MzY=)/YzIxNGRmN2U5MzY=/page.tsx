"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Article = () => {
  const pathName = usePathname();

  return (
    <div>
      {/* heading */}
      <div className="text-7xl font-bold">{pathName}</div>
    </div>
  );
};

export default Article;
