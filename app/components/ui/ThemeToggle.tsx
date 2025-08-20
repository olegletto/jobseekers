import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Theme } from "../../hooks/useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <motion.button
      className="fixed top-6 right-6 z-50 p-2 rounded-full bg-opacity-20 backdrop-blur-md shadow-lg cursor-pointer"
      onClick={onToggle}
      whileHover={{ rotate: 15, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-white mix-blend-difference" aria-hidden="true" />
      ) : (
        <Moon className="w-6 h-6 text-gray-800 mix-blend-difference" aria-hidden="true" />
      )}
    </motion.button>
  );
}; 