import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  onClick?: () => void;
  variants?: Variants;
  ariaLabel?: string;
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
  variants = buttonVariants,
  ariaLabel
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
      aria-label={ariaLabel}
      className={`${baseClasses} ${className} ${
        disabled || isLoading ? disabledClasses : enabledClasses
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center" aria-live="polite">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" aria-hidden="true"></div>
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}; 