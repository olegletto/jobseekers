import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  show: boolean;
  message: string;
  isError: boolean;
  onClose: () => void;
}

export const Toast = ({ show, message, isError, onClose }: ToastProps) => {
  const toastVariants = {
    initial: { opacity: 0, y: -50, x: "-50%" },
    animate: { opacity: 1, y: 0, x: "-50%", transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, x: "-50%", transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={toastVariants}
          className={`fixed top-6 left-1/2 z-50 flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg ${
            isError ? 'bg-red-500' : 'bg-[#028090]'
          }`}
        >
          {isError ? (
            <X size={18} />
          ) : (
            <CheckCircle size={18} />
          )}
          <span>{message}</span>
          <button 
            onClick={onClose}
            className="ml-2 hover:text-gray-200"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 