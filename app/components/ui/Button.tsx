import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  onClick?: () => void;
  variants?: any;
}

const buttonVariants = {
  initial: { opacity: 0.8 },
  hover: { scale: 1.05, opacity: 1 },
  tap: { scale: 0.98 }
};

export const Button = ({
  children,
  type = "button",
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  className = "",
  onClick,
  variants = buttonVariants
}: ButtonProps) => {
  const baseClasses = "font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer";
  const disabledClasses = "bg-gray-400 cursor-not-allowed";
  const enabledClasses = "bg-[#00a896] hover:bg-[#00a896]/70 text-white";

  return (
    <motion.button
      variants={variants}
      whileHover="hover"
      whileTap="tap"
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${className} ${
        disabled || isLoading ? disabledClasses : enabledClasses
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}; 