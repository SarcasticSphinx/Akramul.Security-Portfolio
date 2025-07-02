import { cn } from "@/lib/utils";
import Link from "next/link";

interface ImageProps {
  src: string;
  alt: string;
}

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: ImageProps;
  icon?: React.ReactNode;
  href?: string;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
  icon,
  href,
}: BentoGridItemProps) => {
  return (
    <Link
      href={href || "#"}
      passHref
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        {image?.src && (
          <img
            src={image.src}
            alt={image.alt || ""}
            className="object-cover transition-transform duration-500 group-hover/bento:scale-110 w-full sm:h-full h-55"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </Link>
  );
};
