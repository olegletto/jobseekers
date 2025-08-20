import { motion } from "framer-motion";
import { Github, Facebook } from "lucide-react";
import { Theme } from "../../hooks/useTheme";

interface SocialButtonsProps {
  theme: Theme;
  onSocialLogin: (provider: string) => void;
}

export const SocialButtons = ({ theme, onSocialLogin }: SocialButtonsProps) => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSocialLogin("Google")}
        className={`flex items-center justify-center py-2 px-4 border rounded-full ${theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"} transition duration-150 cursor-pointer`}
        aria-label="Sign in with Google"
      >
        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="" className="h-5 w-auto" aria-hidden="true" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSocialLogin("GitHub")}
        className={`flex items-center justify-center py-2 px-4 border rounded-full ${theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"} transition duration-150 cursor-pointer`}
        aria-label="Sign in with GitHub"
      >
        <Github className="h-5 w-5" aria-hidden="true" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSocialLogin("Facebook")}
        className={`flex items-center justify-center py-2 px-4 border rounded-full ${theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"} transition duration-150 cursor-pointer`}
        aria-label="Sign in with Facebook"
      >
        <Facebook className="h-5 w-5 text-blue-600" aria-hidden="true" />
      </motion.button>
    </div>
  );
}; 