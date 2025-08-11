import React, { ReactNode } from "react";

type SelecSize = "small" | "medium" | "large";

interface CustomSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: SelecSize;
  children: ReactNode;
}

const sizeClasses: Record<SelecSize, string> = {
  small: "text-sm py-1 px-2",
  medium: "text-base py-2 px-3",
  large: "text-lg py-3 px-4 w-full",
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  size = "medium",
  children,
  className = "",
  ...props
}) => {
  return (
    <div className="relative">
      <select
        className={`${sizeClasses[size]} rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default CustomSelect;
