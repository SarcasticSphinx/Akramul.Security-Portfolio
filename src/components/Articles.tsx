import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

export function Articles() {
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
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              href={item.link}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const items = [
  {
    title: "The Psychology of Cybersecurity Threats",
    description: "Understanding the Human Mind in cybersecurity threats.",
    header: (
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Image
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="Psychological aspects of cybersecurity"
          fill
          className="object-cover transition-transform duration-500 group-hover/bento:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    ),
    icon: <IconClipboardCopy className="h-6 w-6 text-blue-400" />,
    link: "https://medium.com/@digitx.comilla/the-psychology-of-cybersecurity-threats-understanding-the-human-mind-c66d7db40330",
  },
  {
    title: "The Human Side of Cybersecurity",
    description: "Exploring the human factors in cybersecurity.",
    header: (
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Image
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="Human elements in cybersecurity"
          fill
          className="object-cover transition-transform duration-500 group-hover/bento:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    ),
    icon: <IconFileBroken className="h-6 w-6 text-blue-400" />,
    link: "https://medium.com/@digitx.comilla/the-human-side-of-cybersecurity-a2b86b364918",
  },
  {
    title: "The Future of Cybersecurity",
    description: "AI, Automation, and New Threats in cybersecurity.",
    header: (
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Image
          src="https://plus.unsplash.com/premium_photo-1676618539992-21c7d3b6df0f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AI and future cybersecurity"
          fill
          className="object-cover transition-transform duration-500 group-hover/bento:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    ),
    icon: <IconSignature className="h-6 w-6 text-blue-400" />,
    link: "https://www.linkedin.com/pulse/future-cybersecurity-ai-automation-new-threats-md-akramul-islam--dw3zc/",
  },
  {
    title: "The Domino Effect in Cybersecurity",
    description: "How small cybersecurity mistakes can have big consequences.",
    header: (
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Image
          src="https://images.unsplash.com/photo-1614064548237-096f735f344f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Domino effect in cybersecurity"
          fill
          className="object-cover transition-transform duration-500 group-hover/bento:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    ),
    icon: <IconTableColumn className="h-6 w-6 text-blue-400" />,
    link: "https://www.linkedin.com/pulse/domino-effect-small-cybersecurity-mistakes-md-akramul-islam--awkac/",
  },
];
