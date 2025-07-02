import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  as?: React.ElementType; // Add this line
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, as: Component = "button", ...props }, ref) => {
  // For non-button elements, remove button-only props
  const isButton = Component === "button";
  const safeProps = isButton
    ? { ref, ...props }
    : { ...props }; // Don't pass ref or button-only props to non-buttons

  return (
    <Component
      ref={isButton ? ref : undefined}
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold",
        className,
      )}
      {...safeProps}
    >
      <span className="inline-block translate-x-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>
    </Component>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
