import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Theme } from "../../hooks/useTheme";

interface SuccessPageProps {
  theme: Theme;
  message: string;
  onContinue: () => void;
}

export const SuccessPage = ({
  theme,
  message,
  onContinue
}: SuccessPageProps) => {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  const buttonVariants = {
    initial: { opacity: 0.8 },
    hover: { scale: 1.05, opacity: 1 },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center min-h-screen w-full px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className={`border-3 border-[#00a896] p-16 rounded-2xl shadow-2xl max-w-md w-full text-center`}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`w-24 h-24 ${theme === "dark" ? "bg-[#00a896] text-white" : "bg-white text-[#00a896]"} rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          <CheckCircle size={48} />
        </motion.div>
        <h2 className="text-3xl font-bold mb-4">Success!</h2>
        <p className="text-lg mb-8">
          {message || "You are now logged in"}
        </p>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onContinue}
          className={`${theme === "dark" ? "bg-[#00a896] text-white" : "bg-white text-[#00a896]"} px-8 py-3 rounded-lg font-medium text-lg shadow-lg cursor-pointer`}
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
}; 