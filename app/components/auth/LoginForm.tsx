import { useState } from "react";
import { motion } from "framer-motion";
import { PageState, AuthFormData } from "../../types/auth";
import { Theme } from "../../hooks/useTheme";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { SocialButtons } from "./SocialButtons";

interface LoginFormProps {
  theme: Theme;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent, formData: AuthFormData, currentPage: PageState, onPageChange: (page: PageState) => void, onShowToast: (message: string, isError?: boolean) => void) => Promise<boolean>;
  onPageChange: (page: PageState) => void;
  onShowToast: (message: string, isError?: boolean) => void;
  onSocialLogin: (provider: string) => void;
}

export const LoginForm = ({
  theme,
  isLoading,
  onSubmit,
  onPageChange,
  onShowToast,
  onSocialLogin
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    await onSubmit(e, { email, password }, "login", onPageChange, onShowToast);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center mb-6 relative">
        <h1 className="text-9xl font-bold bg-linear-to-b from-[#028090] from-25% to-[#02c39a] to-55% bg-clip-text text-transparent">
          J
        </h1>
        <span className="absolute text-2xl -top-1 bg-linear-to-b from-[#028090] from-35% to-[#02c39a] to-65% bg-clip-text text-transparent">
          career
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">Welcome back</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Please Enter your Account details</p>
      
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
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium">Password</label>
            <motion.button
              type="button"
              onClick={() => onPageChange("forgot-password")}
              className="text-sm text-[#00a896] hover:underline cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Forgot Password
            </motion.button>
          </div>
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            required
            theme={theme}
            showPasswordToggle
          />
        </div>
        
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Signing in..."
          className="w-full"
        >
          Sign in
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
          Don&apos;t have an account?{" "}
          <motion.button
            onClick={() => onPageChange("signup")}
            className="text-[#00a896] hover:underline font-medium cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create an account
          </motion.button>
        </p>
      </div>
    </motion.div>
  );
}; 