
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";

// Define the Article type
interface Article {
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  link: string;
}

const getArticles = async (): Promise<Article[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
    cache: "no-store", // or 'force-cache' if the data doesn't change often
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Articles");
  }

  return res.json();
};

export async function Articles() {
  const articles = await getArticles();

  return (
    <section
      id="articles"
      className="min-h-screen py-20 bg-gradient-to-b from-slate-900 via-black to-slate-950"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            My <span className="text-blue-400">Articles</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Insights and perspectives on cybersecurity, technology, and human
            factors
          </p>
        </div>

        <BentoGrid className="max-w-6xl mx-auto">
          {articles.map((article: Article, i: number) => (
            <BentoGridItem
              key={i}
              title={article.title}
              description={article.description}
              image={article.image ? { src: article.image, alt: article.title } : undefined}
              icon={article.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              href={article.link}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}