// filepath: /Users/nicoj3000/proyectos/landing-page/components/ui/separator.tsx
export const Separator = ({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical"; className?: string }) => {
    return (
      <div
        className={`${
          orientation === "vertical" ? "w-px h-full" : "h-px w-full"
        } bg-gray-200 dark:bg-gray-700 ${className}`}
      />
    );
  };