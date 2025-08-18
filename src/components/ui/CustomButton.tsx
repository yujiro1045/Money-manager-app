import React from "react";

type ButtonProps = {
  text: string;
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "red" | "gray";
  type?: "button" | "submit" | "reset";
  onclick?: () => void;
};

const sizeClasses = {
  small: "py-2.5 text-sm",
  medium: "px-6 py-2.5 text-base",
  large: "px-8 py-2.5 text-lg",
};

const colorClasses = {
  blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
  green:
    "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
  red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
  gray: "from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600",
};

export const CustomButton = ({
  onclick,
  text,
  color = "blue",
  size = "large",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`w-full bg-gradient-to-r ${colorClasses[color]} text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 ${sizeClasses[size]}`}
    >
      {text}
    </button>
  );
};
