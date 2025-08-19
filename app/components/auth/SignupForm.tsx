import { useState } from "react";
import { motion } from "framer-motion";
import { PageState, AuthFormData } from "../../types/auth";
import { Theme } from "../../hooks/useTheme";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { SocialButtons } from "./SocialButtons";

interface SignupFormProps {
  theme: Theme;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent, formData: AuthFormData, currentPage: PageState, onPageChange: (page: PageState) => void, onShowToast: (message: string, isError?: boolean) => void) => Promise<boolean>;
  onPageChange: (page: PageState) => void;
  onShowToast: (message: string, isError?: boolean) => void;
  onSocialLogin: (provider: string) => void;
}

export const SignupForm = ({
  theme,
  isLoading,
  onSubmit,
  onPageChange,
  onShowToast,
  onSocialLogin
}: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    await onSubmit(e, { email, password, confirmPassword }, "signup", onPageChange, onShowToast);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">Create Account</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Join our community and find your dream job</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Johndoe@gmail.com"
          label="Email"
          required
          theme={theme}
        />
        
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          label="Password"
          required
          theme={theme}
          showPasswordToggle
        />
        
        <Input
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="••••••••"
          label="Confirm Password"
          required
          theme={theme}
          showPasswordToggle
        />
        
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Creating account..."
          className="w-full"
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${theme === "dark" ? "bg-black text-gray-400" : "bg-white text-gray-500"}`}>
              Or continue with
            </span>
          </div>
        </div>
        
        <SocialButtons theme={theme} onSocialLogin={onSocialLogin} />
      </div>
      
      <div className="mt-8 text-center">
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
          Already have an account?{" "}
          <motion.button
            onClick={() => onPageChange("login")}
            className="text-[#00a896] hover:underline font-medium cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign in
          </motion.button>
        </p>
      </div>
    </motion.div>
  );
}; 