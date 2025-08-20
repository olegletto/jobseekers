import { useState } from "react";
import { motion } from "framer-motion";
import { PageState, AuthFormData } from "../../types/auth";
import { Theme } from "../../hooks/useTheme";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface ForgotPasswordFormProps {
  theme: Theme;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent, formData: AuthFormData, currentPage: PageState, onPageChange: (page: PageState) => void, onShowToast: (message: string, isError?: boolean) => void) => Promise<boolean>;
  onPageChange: (page: PageState) => void;
  onShowToast: (message: string, isError?: boolean) => void;
}

type ForgotPasswordStep = "email" | "reset";

export const ForgotPasswordForm = ({
  theme,
  isLoading,
  onSubmit,
  onPageChange,
  onShowToast
}: ForgotPasswordFormProps) => {
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate the forgot password request
    const success = await onSubmit(e, { email }, "forgot-password", onPageChange, onShowToast);
    
    // Only move to reset step if the request was successful
    if (success) {
      setStep("reset");
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    onSubmit(e, { email, password, confirmPassword }, "forgot-password", onPageChange, onShowToast);
  };

  const handleBackToEmail = () => {
    setStep("email");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {step === "email" ? (
        <>
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Reset Password</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Enter your email to receive recovery instructions</p>
          
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <Input
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Johndoe@gmail.com"
              label="Email"
              required
              theme={theme}
              name="email"
            />
            
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Sending recovery email..."
              className="w-full"
            >
              Send Recovery Email
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Remember your password?{" "}
              <motion.button
                onClick={() => onPageChange("login")}
                className="text-[#00a896] hover:underline font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to login
              </motion.button>
            </p>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Set New Password</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Create a new secure password for your account</p>
          
          {email && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Resetting password for: <span className="font-medium">{email}</span>
            </p>
          )}
          
          <form onSubmit={handleResetSubmit} className="space-y-6">
            <Input
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              label="New Password"
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
              loadingText="Updating password..."
              className="w-full"
            >
              Update Password
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              <motion.button
                onClick={handleBackToEmail}
                className="text-[#00a896] hover:underline font-medium cursor-pointer mr-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to email
              </motion.button>
              {" "}or{" "}
              <motion.button
                onClick={() => onPageChange("login")}
                className="text-[#00a896] hover:underline font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to login
              </motion.button>
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}; 