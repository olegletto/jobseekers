"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Moon, 
  Sun, 
  Github,
  Facebook,
  CheckCircle,
  X
} from "lucide-react";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

type PageState = "login" | "signup" | "forgot-password" | "reset-password" | "success";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [currentPage, setCurrentPage] = useState<PageState>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const testimonials = [
    {
      text: "Search and find your dream job is now easier than ever. Just browse a job and apply if you need to.",
      author: "Mas Parjono",
      position: "UI Designer at Google"
    },
    {
      text: "The platform made job hunting seamless. I found my ideal position within a week!",
      author: "Sarah Chen",
      position: "Frontend Developer at Meta"
    },
    {
      text: "As a recruiter, this has simplified our hiring process immensely. Highly recommended!",
      author: "James Wilson",
      position: "HR Director at Amazon"
    }
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showToastMessage("Please enter a valid email address");
      return;
    }
    
    if (currentPage === "login" || currentPage === "signup" || currentPage === "reset-password") {
      if (!validatePassword(password)) {
        showToastMessage("Password must be at least 8 characters");
        return;
      }
    }
    
    if (currentPage === "signup" || currentPage === "reset-password") {
      if (password !== confirmPassword) {
        showToastMessage("Passwords do not match");
        return;
      }
    }
    
    if (currentPage === "login") {
      setCurrentPage("success");
      showToastMessage("Successfully logged in!");
    } else if (currentPage === "signup") {
      setCurrentPage("success");
      showToastMessage("Account created successfully!");
    } else if (currentPage === "forgot-password") {
      setCurrentPage("reset-password");
      showToastMessage("Recovery email sent!");
    } else if (currentPage === "reset-password") {
      setCurrentPage("login");
      showToastMessage("Password reset successfully!");
    }
  };

  const handleSocialLogin = (provider: string) => {
    setCurrentPage("success");
    showToastMessage(`Successfully logged in with ${provider}!`);
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

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

  const toastVariants = {
    initial: { opacity: 0, y: -50, x: "-50%" },
    animate: { opacity: 1, y: 0, x: "-50%", transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, x: "-50%", transition: { duration: 0.2 } }
  };

  const starVariants = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Компонент для социальных кнопок
  const SocialButtons = () => (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleSocialLogin("Google")}
        className={`flex items-center justify-center py-2 px-4 border rounded-full ${theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"} transition duration-150 cursor-pointer`}
      >
        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google" className="h-5 w-auto" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleSocialLogin("GitHub")}
        className={`flex items-center justify-center py-2 px-4 border rounded-full ${theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"} transition duration-150 cursor-pointer`}
      >
        <Github className="h-5 w-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleSocialLogin("Facebook")}
        className={`flex items-center justify-center py-2 px-4 border rounded-full ${theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"} transition duration-150 cursor-pointer`}
      >
        <Facebook className="h-5 w-5 text-blue-600" />
      </motion.button>
    </div>
  );

  return (
    <div className={`h-full ${theme === "dark" ? "bg-[#1e293b] text-white" : "bg-gray-100 text-black"} ${workSans.className}`}>      
      <motion.button
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-opacity-20 backdrop-blur-md shadow-lg cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        whileHover={{ rotate: 15, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
      >
        {theme === "dark" ? (
          <Sun className="w-6 h-6 text-white mix-blend-difference" />
        ) : (
          <Moon className="w-6 h-6 text-gray-800 mix-blend-difference" />
        )}
      </motion.button>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={toastVariants}
            className="fixed top-6 left-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-[#028090] text-white rounded-lg shadow-lg"
          >
            <CheckCircle size={18} />
            <span>{toastMessage}</span>
            <button 
              onClick={() => setShowToast(false)}
              className="ml-2 hover:text-gray-200"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-full container mx-auto flex flex-col md:flex-row">
        <AnimatePresence mode="wait">
          {currentPage === "success" ? (
            <motion.div
              key="success"
              className="flex flex-col justify-center items-center min-h-screen w-full px-4"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <motion.div 
                className={`border-3 border-[#00a896] p-16 rounded-2xl shadow-2xl max-w-md w-full text-center`}
                variants={cardVariants}
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
                  {toastMessage || "You are now logged in"}
                </p>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setCurrentPage("login")}
                  className={`${theme === "dark" ? "bg-[#00a896] text-white" : "bg-white text-[#00a896]"} px-8 py-3 rounded-lg font-medium text-lg shadow-lg cursor-pointer`}
                >
                  Continue
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="auth-pages"
              className="flex flex-col md:flex-row min-h-screen w-full"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <div className={`w-full md:w-1/2 p-6 md:px-16 xl:px-30 flex flex-col justify-center ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-800"}`}>
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-md mx-auto w-full"
                > 
                  <AnimatePresence mode="wait">
                    {currentPage === "login" && (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="flex items-center justify-center mb-6 relative">
                          <h1 className="text-9xl font-bold bg-linear-to-b from-[#028090] from-25% to-[#02c39a] to-55% bg-clip-text text-transparent">
                          J</h1>
                          <span className="absolute text-2xl -top-1 bg-linear-to-b from-[#028090] from-35% to-[#02c39a] to-65% bg-clip-text text-transparent">career</span>
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-2">Welcome back</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Please Enter your Account details</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Email</label>
                            <div className="relative">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896]`}
                                placeholder="Johndoe@gmail.com"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="block text-sm font-medium">Password</label>
                              <motion.button
                                type="button"
                                onClick={() => setCurrentPage("forgot-password")}
                                className="text-sm text-[#00a896] hover:underline cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Forgot Password
                              </motion.button>
                            </div>
                            <div className="relative">
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896]`}
                                placeholder="••••••••"
                                required
                              />
                            </div>
                          </div>
                          
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="submit"
                            className="w-full bg-[#00a896] hover:bg-[#00a896]/70 text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
                          >
                            Sign in
                          </motion.button>
                        </form>
                        
                        <div className="mt-8">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className={`w-full border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className={`px-2 ${theme === "dark" ? "bg-black text-gray-400" : "bg-white text-gray-500"}`}>Or continue with</span>
                            </div>
                          </div>
                          
                          <SocialButtons />
                        </div>
                        
                        <div className="mt-8 text-center">
                          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                            Don&apos;t have an account?{" "}
                            <motion.button
                              onClick={() => setCurrentPage("signup")}
                              className="text-[#00a896] hover:underline font-medium cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Create an account
                            </motion.button>
                          </p>
                        </div>
                      </motion.div>
                    )}
                    
                    {currentPage === "signup" && (
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-3xl md:text-4xl font-semibold mb-2">Create Account</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Join our community and find your dream job</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Email</label>
                            <div className="relative">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896]`}
                                placeholder="Johndoe@gmail.com"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Password</label>
                            <div className="relative">
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896]`}
                                placeholder="••••••••"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Confirm Password</label>
                            <div className="relative">
                              <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896]`}
                                placeholder="••••••••"
                                required
                              />
                            </div>
                          </div>
                          
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="submit"
                            className="w-full bg-[#00a896] hover:bg-[#00a896]/70 text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
                          >
                            Create Account
                          </motion.button>
                        </form>
                        
                        <div className="mt-8">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className={`w-full border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className={`px-2 ${theme === "dark" ? "bg-black text-gray-400" : "bg-white text-gray-500"}`}>Or continue with</span>
                            </div>
                          </div>
                          
                          <SocialButtons />
                        </div>
                        
                        <div className="mt-8 text-center">
                          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                            Already have an account?{" "}
                            <motion.button
                              onClick={() => setCurrentPage("login")}
                              className="text-[#00a896] hover:underline font-medium cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Sign in
                            </motion.button>
                          </p>
                        </div>
                      </motion.div>
                    )}
                    
                    {currentPage === "forgot-password" && (
                      <motion.div
                        key="forgot-password"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-3xl md:text-4xl font-semibold mb-2">Reset Password</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Enter your email to receive recovery instructions</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Email</label>
                            <div className="relative">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896]`}
                                placeholder="Johndoe@gmail.com"
                                required
                              />
                            </div>
                          </div>
                          
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="submit"
                            className="w-full bg-[#00a896] hover:bg-[#00a896]/70 text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
                          >
                            Recover
                          </motion.button>
                        </form>
                        
                        <div className="mt-8 text-center">
                          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                            Remember your password?{" "}
                            <motion.button
                              onClick={() => setCurrentPage("login")}
                              className="text-[#00a896] hover:underline font-medium cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Back to login
                            </motion.button>
                          </p>
                        </div>
                      </motion.div>
                    )}
                    
                    {currentPage === "reset-password" && (
                      <motion.div
                        key="reset-password"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">Set New Password</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Create a new secure password for your account</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">New Password</label>
                            <div className="relative">
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896]`}
                                placeholder="••••••••"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Confirm Password</label>
                            <div className="relative">
                              <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896]`}
                                placeholder="••••••••"
                                required
                              />
                            </div>
                          </div>
                          
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="submit"
                            className="w-full bg-[#00a896] hover:bg-[#00a896]/70 text-white font-medium py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
                          >
                            Update Password
                          </motion.button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#00a896] to-[#00a896]/70 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="nebula" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#nebula)" />
                  </svg>
                </div>

                <div className="relative z-10 p-8 md:p-16 max-w-lg">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="mb-16"
                  >
                    <h2 className="text-4xl font-bold text-white mb-6">What&apos;s our Jobseekers Said.</h2>
                    <div className="relative overflow-hidden bg-[#028090] bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-xl">
                      <div className="text-white">
                        <blockquote className="relative">
                          <span className="block text-5xl font-serif absolute -top-5 -left-4 text-white opacity-50">"</span>
                          <p className="text-lg mb-4 relative z-10">{testimonials[0].text}</p>
                          <footer className="mt-6">
                            <p className="font-semibold">{testimonials[0].author}</p>
                            <p className="text-green-100 text-sm">{testimonials[0].position}</p>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="relative z-20"
                  >
                    <motion.div 
                      className="bg-white rounded-3xl p-8 shadow-xl"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Find the right job and the right place. Apply now!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Be among the first to experience the easiest way to start a business.
                      </p>
                      <div className="flex -space-x-2 overflow-hidden mb-2">
                        <img
                          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <img
                          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <img
                          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                          alt=""
                        />
                        <img
                          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-500 text-sm font-medium">
                          +2
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-70"
                    variants={starVariants}
                    animate="rotate"
                  >
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M60 0L69.282 50.718L120 60L69.282 69.282L60 120L50.718 69.282L0 60L50.718 50.718L60 0Z" fill="white"/>
                      <path d="M60 20L65.176 54.824L100 60L65.176 65.176L60 100L54.824 65.176L20 60L54.824 54.824L60 20Z" fill="white" fillOpacity="0.6"/>
                      <path d="M60 40L61.051 58.949L80 60L61.051 61.051L60 80L58.949 61.051L40 60L58.949 58.949L60 40Z" fill="white" fillOpacity="0.4"/>
                    </svg>
                  </motion.div>

                  <div className="absolute inset-0 overflow-hidden opacity-30">
                    <div className="absolute -right-40 -top-40 w-80 h-80 rounded-full bg-white opacity-10"></div>
                    <div className="absolute -left-20 top-1/2 w-60 h-60 rounded-full bg-white opacity-10"></div>
                    <div className="absolute right-20 bottom-20 w-40 h-40 rounded-full bg-white opacity-10"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}