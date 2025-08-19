import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { Theme } from "../../hooks/useTheme";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Toast } from "../ui/Toast";

interface AuthLayoutProps {
  theme: Theme;
  children: ReactNode;
  showToast: boolean;
  toastMessage: string;
  isError: boolean;
  onToggleTheme: () => void;
  onCloseToast: () => void;
}

export const AuthLayout = ({
  theme,
  children,
  showToast,
  toastMessage,
  isError,
  onToggleTheme,
  onCloseToast
}: AuthLayoutProps) => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className={`h-full ${theme === "dark" ? "bg-[#1e293b] text-white" : "bg-gray-100 text-black"}`}>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />

      <Toast
        show={showToast}
        message={toastMessage}
        isError={isError}
        onClose={onCloseToast}
      />

      <div className="h-full container mx-auto flex flex-col md:flex-row">
        <AnimatePresence mode="wait">
          <motion.div
            className="flex flex-col md:flex-row min-h-screen w-full"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}; 