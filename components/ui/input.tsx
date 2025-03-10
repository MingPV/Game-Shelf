import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean; // Add error state
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm transition-all",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-gray-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
